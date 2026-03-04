# DATA MERGE STRATEGY
## Philadelphia Historical Synagogues - Clean Dataset Creation

### CURRENT STATE

**Three Data Sources:**

1. **Data from Dad** (848 rows, 536 unique synagogues)
   - Primary synagogue information
   - 449 with address data
   - 443 with founded year
   - 239 with closed info
   - 601 with history text (includes embedded rabbi info)

2. **Other Addresses** (665 rows, 268 unique synagogues)
   - Clean temporal address data
   - 370 with start years
   - 81 marked as "Current"
   - Multiple addresses per synagogue showing moves over time

3. **Other Rabbis** (742 rows, 291 unique synagogues)
   - Clean temporal rabbi data
   - 655 unique rabbis
   - 740 with start years
   - 17 marked as "Current"

**Overlap Analysis:**
- Total unique synagogues: **790**
- In all three sources: **43**
- ONLY in Dad's data: **488**
- ONLY in other sources: **254**

---

## RECOMMENDED APPROACH

### Phase 1: Create Master Synagogue List

**Goal:** Single authoritative list of all 790 unique synagogues

**Strategy:**
1. Start with Dad's 536 synagogues as base (most comprehensive)
2. Add 254 synagogues from other sources not in Dad's data
3. Normalize synagogue names for matching
   - Handle "Temple" prefix variations
   - Handle spelling differences
   - Manual review of close matches

**Output:** `master_synagogues.csv`
- Columns: synagogue_id, name, name_normalized, founded_year, closed_year, status, neighborhood, data_sources

---

### Phase 2: Consolidate Address Data

**Goal:** Complete temporal address history for each synagogue

**Strategy:**
1. Extract addresses from Dad's data (current/newest + prior)
2. Add all addresses from Other Addresses sheet
3. For each synagogue:
   - Deduplicate similar addresses
   - Assign temporal ranges
   - Mark current address
   - Clean and standardize format

**Address Cleaning:**
- Expand abbreviations (St → Street, Ave → Avenue)
- Add city if missing (default: Philadelphia, PA)
- Add state if missing (PA)
- Research zip codes where possible
- Format: "Street Number Street Name, City, State ZIP"

**Output:** `master_addresses.csv`
- Columns: address_id, synagogue_id, street_address, city, state, zip_code, neighborhood, start_year, end_year, is_current, source

---

### Phase 3: Consolidate Rabbi Data

**Goal:** Complete rabbi succession for each synagogue

**Strategy:**
1. Parse rabbis from Dad's history column (lines starting with ">")
2. Add all rabbis from Other Rabbis sheet
3. For each synagogue:
   - Deduplicate by name
   - Preserve all temporal data
   - Handle gaps in tenure

**Output:** `master_rabbis.csv`
- Columns: rabbi_id, synagogue_id, name, title, start_year, end_year, is_current, source

---

### Phase 4: Extract History Text

**Goal:** Preserve rich historical narratives

**Strategy:**
1. Extract all history text from Dad's data
2. Remove embedded rabbi references (already in rabbis table)
3. Categorize:
   - [Ethnic Origins] → type: "ethnic_origins"
   - General history → type: "general"
   - Other markers → appropriate types

**Output:** `master_history.csv`
- Columns: history_id, synagogue_id, content, entry_type, year, source

---

## DETAILED WORKFLOW

### Step 1: Synagogue Name Normalization

I'll create a mapping between different name variations:

**Examples of issues to resolve:**
- "Temple Adath Israel" vs "Adath Israel"
- Different spellings or abbreviations
- Cross-references (e.g., "See, Beth El")

**Process:**
1. Normalize all names (remove "Temple", standardize spacing)
2. Fuzzy match similar names (>85% similarity)
3. Present matches for your review
4. Create final master list with canonical names

### Step 2: Address Consolidation

**For each synagogue:**
1. Collect all addresses from both sources
2. Compare and deduplicate
3. Assign/verify temporal ranges
4. Clean formatting:
   ```
   Before: "Montgomery and Wynnewood Avenues; Wynnewood, PA"
   After: "Montgomery Avenue and Wynnewood Avenue, Wynnewood, PA 19096"
   ```

### Step 3: Geocoding

**After addresses are cleaned:**
1. Use Google Geocoding API
2. Batch process all ~1000+ addresses
3. Handle failures manually
4. Add lat/lon to master file

### Step 4: Generate Import SQLs

**Final outputs:**
1. `import_synagogues.sql` - 790 synagogues
2. `import_addresses.sql` - ~1000+ addresses with geocoding
3. `import_rabbis.sql` - ~750+ rabbis
4. `import_history.sql` - ~600+ history entries

---

## QUESTIONS FOR YOU

Before I proceed, please confirm:

1. **Synagogue Matching:** Should I automatically merge similar names (>90% match) or present all matches for your review first?

2. **Data Priority:** When sources conflict (e.g., different founded years), which source takes priority?
   - Dad's data (more comprehensive but sometimes vague)
   - Other sources (more precise temporal data)
   - Or: Keep both and flag for manual review?

3. **Address Cleaning:** How aggressive should I be?
   - Just basic cleanup?
   - Or research missing zip codes, expand abbreviations, etc.?

4. **Starting Fresh:** Do you want to:
   - Replace EVERYTHING in Supabase with this clean dataset?
   - Or merge with existing data (keep what's there, add what's new)?

5. **Manual Review:** How much do you want to review vs automated?
   - I can generate CSVs for you to review before SQL
   - Or trust the automated matching and clean up issues later?

---

## ESTIMATED TIMELINE

**Automated Processing:**
- Phase 1 (Synagogue matching): ~30 min
- Phase 2 (Address consolidation): ~45 min
- Phase 3 (Rabbi consolidation): ~30 min
- Phase 4 (History extraction): ~20 min

**Manual Review (if desired):**
- Review synagogue matches: ~1-2 hours
- Review address matches: ~1-2 hours
- Spot-check data quality: ~30 min

**Geocoding:**
- ~1000 addresses at 0.1s each = ~2-3 hours

**Total:** 3-5 hours automated + optional manual review time

---

## RECOMMENDATION

**My suggested workflow:**

1. ✅ Run automated matching with 90% threshold
2. ✅ Generate CSV files for your review
3. ✅ You approve/modify matches
4. ✅ I generate clean dataset
5. ✅ Run geocoding
6. ✅ Generate SQL imports
7. ✅ Replace Supabase data fresh

This gives you control while automating the tedious work.

**Ready to proceed?** Let me know your answers to the questions above and I'll start!
