use ic_cdk_macros::*;
use candid::{CandidType, Nat, Principal};
use serde::{Deserialize, Serialize};
use std::cell::RefCell;
use std::collections::HashMap;

// Structure to store CCID data for a specific date
#[derive(Debug, CandidType, Deserialize, Serialize)]
pub struct DateRecord {
    date: i64,
    ccids: Vec<String>,  // Using String for CCIDs
}

#[derive(Default)]
struct RuntimeState {
    ccid: CcidState,
}

#[derive(Default)]
struct CcidState {
    // Map of date (as timestamp) to vector of CCIDs for that date
    ccids_by_date: HashMap<i64, Vec<String>>,
    // Counter for total CCIDs (if needed)
    total_ccids: u32,
}

thread_local! {
    static RUNTIME_STATE: RefCell<RuntimeState> = RefCell::default();
}

fn days_to_ymd(days: i64) -> (i32, u8, u8) {
    let year = 1970 + (days / 365) as i32;
    let mut rem_days = days % 365;
    
    // Account for leap years
    let leap_years = (year - 1969) / 4;
    rem_days -= leap_years as i64;
    
    let month_days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    let mut month = 1;
    for &days_in_month in &month_days {
        if rem_days < days_in_month as i64 {
            break;
        }
        rem_days -= days_in_month as i64;
        month += 1;
    }
    
    (year, month as u8, (rem_days + 1) as u8)
}

#[update]
fn add_hash(hash_input: String) -> String {  // Changed name back to add_hash
    RUNTIME_STATE.with(|state| {
        let mut state = state.borrow_mut();
        let current_time = ic_cdk::api::time();
        let days_since_epoch = (current_time / (86400 * 1_000_000_000)) as i64;
        
        let (year, month, day) = days_to_ymd(days_since_epoch);
        let date_key = (year as i64) * 10000 + (month as i64) * 100 + (day as i64);
        
        // Store hash for the date
        state.ccid.ccids_by_date
            .entry(date_key)
            .or_insert_with(Vec::new)
            .push(hash_input.clone());
        
        // Increment total CCIDs counter
        state.ccid.total_ccids += 1;
        
        hash_input
    })
}

#[query]
fn get_date_data(timestamp: i64) -> Option<DateRecord> {  // Changed name back to get_date_data
    RUNTIME_STATE.with(|state| {
        let state = state.borrow();
        state.ccid.ccids_by_date.get(&timestamp).map(|ccids| DateRecord {
            date: timestamp,
            ccids: ccids.clone(),
        })
    })
}

#[query]
fn get_all_data() -> Vec<DateRecord> {  // Changed name back to get_all_data
    RUNTIME_STATE.with(|state| {
        let state = state.borrow();
        state.ccid.ccids_by_date
            .iter()
            .map(|(&date, ccids)| DateRecord {
                date,
                ccids: ccids.clone(),
            })
            .collect()
    })
}

#[query]
fn format_date(date_key: i64) -> String {
    let year = date_key / 10000;
    let month = (date_key % 10000) / 100;
    let day = date_key % 100;
    format!("{:04}-{:02}-{:02}", year, month, day)
}

// Export Candid interface
ic_cdk::export_candid!();