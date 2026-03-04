#!/usr/bin/env python3
"""
Google Geocoding Script - Clean Address Data
Processes addresses through Google Geocoding API to get:
- Cleaned street address
- City
- State  
- ZIP code
- Latitude
- Longitude
"""

import requests
import pandas as pd
import time
import sys

# Configuration
API_KEY = "AIzaSyBxqGTP-pITv_Rv0FBXTV48Gi0ms8kTDIU"
INPUT_FILE = "master_addresses.csv"
OUTPUT_FILE = "master_addresses_geocoded.csv"
FAILED_FILE = "addresses_failed_geocoding.csv"
DELAY_BETWEEN_REQUESTS = 0.1  # seconds

def geocode_address(address_parts, api_key):
    """
    Geocode an address using Google Geocoding API
    
    Args:
        address_parts: dict with street_address, city, state, zip_code
        api_key: Google API key
    
    Returns:
        dict with cleaned components and coordinates
    """
    # Build full address string
    parts = []
    if address_parts.get('street_address'):
        parts.append(address_parts['street_address'])
    if address_parts.get('city'):
        parts.append(address_parts['city'])
    if address_parts.get('state'):
        parts.append(address_parts['state'])
    if address_parts.get('zip_code'):
        parts.append(str(address_parts['zip_code']))
    
    full_address = ', '.join(parts)
    
    base_url = "https://maps.googleapis.com/maps/api/geocode/json"
    
    params = {
        'address': full_address,
        'key': api_key
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if data['status'] == 'OK':
            result = data['results'][0]
            
            # Extract components
            components = {}
            for comp in result['address_components']:
                types = comp['types']
                if 'street_number' in types:
                    components['street_number'] = comp['long_name']
                elif 'route' in types:
                    components['route'] = comp['long_name']
                elif 'locality' in types:
                    components['city'] = comp['long_name']
                elif 'administrative_area_level_1' in types:
                    components['state'] = comp['short_name']
                elif 'postal_code' in types:
                    components['zip_code'] = comp['long_name']
            
            # Build clean street address
            street_parts = []
            if 'street_number' in components:
                street_parts.append(components['street_number'])
            if 'route' in components:
                street_parts.append(components['route'])
            
            clean_street = ' '.join(street_parts) if street_parts else address_parts.get('street_address', '')
            
            return {
                'street_address': clean_street,
                'city': components.get('city', address_parts.get('city', '')),
                'state': components.get('state', address_parts.get('state', '')),
                'zip_code': components.get('zip_code', address_parts.get('zip_code', '')),
                'latitude': result['geometry']['location']['lat'],
                'longitude': result['geometry']['location']['lng'],
                'formatted_address': result['formatted_address'],
                'status': 'OK'
            }
        else:
            return {
                'street_address': address_parts.get('street_address', ''),
                'city': address_parts.get('city', ''),
                'state': address_parts.get('state', ''),
                'zip_code': address_parts.get('zip_code', ''),
                'latitude': None,
                'longitude': None,
                'formatted_address': None,
                'status': data['status']
            }
    except Exception as e:
        return {
            'street_address': address_parts.get('street_address', ''),
            'city': address_parts.get('city', ''),
            'state': address_parts.get('state', ''),
            'zip_code': address_parts.get('zip_code', ''),
            'latitude': None,
            'longitude': None,
            'formatted_address': None,
            'status': f'ERROR: {str(e)}'
        }

def main():
    if API_KEY == "YOUR_GOOGLE_API_KEY_HERE":
        print("ERROR: Please set your Google API key in the script!")
        print("Edit the script and replace YOUR_GOOGLE_API_KEY_HERE with your actual key")
        sys.exit(1)
    
    # Read input
    print(f"Reading {INPUT_FILE}...")
    df = pd.read_csv(INPUT_FILE)
    
    print(f"Found {len(df)} addresses to geocode")
    print(f"Starting geocoding...\n")
    
    results = []
    failed = []
    
    for i, row in df.iterrows():
        print(f"[{i+1}/{len(df)}] {row['synagogue_name']}")
        
        address_parts = {
            'street_address': row['street_address'],
            'city': row['city'],
            'state': row['state'],
            'zip_code': row['zip_code']
        }
        
        print(f"  Input: {address_parts['street_address']}, {address_parts['city']}, {address_parts['state']}")
        
        # Geocode
        result = geocode_address(address_parts, API_KEY)
        
        if result['status'] == 'OK':
            print(f"  ✓ Success: {result['formatted_address']}")
            print(f"    Coordinates: {result['latitude']}, {result['longitude']}")
            if result['zip_code']:
                print(f"    ZIP: {result['zip_code']}")
        else:
            print(f"  ✗ Failed: {result['status']}")
            failed.append({
                'synagogue_name': row['synagogue_name'],
                'original_address': f"{address_parts['street_address']}, {address_parts['city']}, {address_parts['state']}",
                'status': result['status']
            })
        
        # Combine original row with geocoded results
        updated_row = row.to_dict()
        updated_row.update({
            'street_address': result['street_address'],
            'city': result['city'],
            'state': result['state'],
            'zip_code': result['zip_code'],
            'latitude': result['latitude'],
            'longitude': result['longitude'],
            'formatted_address': result['formatted_address'],
            'geocode_status': result['status']
        })
        
        results.append(updated_row)
        
        # Rate limiting
        time.sleep(DELAY_BETWEEN_REQUESTS)
        print()
    
    # Save results
    result_df = pd.DataFrame(results)
    result_df.to_csv(OUTPUT_FILE, index=False)
    
    print(f"\n{'='*80}")
    print("GEOCODING COMPLETE")
    print(f"{'='*80}")
    print(f"Total addresses: {len(df)}")
    print(f"Successfully geocoded: {len([r for r in results if r['geocode_status'] == 'OK'])}")
    print(f"Failed: {len(failed)}")
    
    if failed:
        failed_df = pd.DataFrame(failed)
        failed_df.to_csv(FAILED_FILE, index=False)
        print(f"\nFailed addresses saved to: {FAILED_FILE}")
    
    print(f"\nResults saved to: {OUTPUT_FILE}")
    
    # Show statistics
    success_count = len([r for r in results if r['geocode_status'] == 'OK'])
    with_zip = len([r for r in results if r['geocode_status'] == 'OK' and r['zip_code']])
    
    print(f"\nStatistics:")
    print(f"  Success rate: {success_count/len(df)*100:.1f}%")
    print(f"  With ZIP codes: {with_zip}/{success_count} ({with_zip/success_count*100:.1f}%)")

if __name__ == "__main__":
    main()
