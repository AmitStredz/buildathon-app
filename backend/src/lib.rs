use std::cell::RefCell;
use ic_cdk_macros::*;
use std::collections::HashMap;
use candid::CandidType;
use serde::{Deserialize, Serialize};

#[derive(Default)]
struct RuntimeState {
    ccid:  Ccid,
}

#[derive(Default)]
struct Ccid {
    // Map of date (as timestamp) to vector of CCIDs for that date
    ccids_by_date: HashMap<i64, Vec<u32>>,
    // Keep track of total CCIDs for generating new IDs
    total_ccids: u32,
}

// Structure to return data for a specific date
#[derive(Debug, CandidType, Deserialize, Serialize)]
struct DateData {
    date: i64,
    ccids: Vec<u32>,
}

thread_local! {
    static RUNTIME_STATE: RefCell<RuntimeState> = RefCell::default();
}

fn add_impl(name: String, runtime_state: &mut RuntimeState) -> u32 {
    let current_time = ic_cdk::api::time();
    let days_since_epoch = (current_time / (86400 * 1_000_000_000)) as i64;
    
    // Calculate year, month, day
    let (year, month, day) = days_to_ymd(days_since_epoch);
    
    // Create a date key in the format YYYYMMDD
    let date_key = (year as i64) * 10000 + (month as i64) * 100 + (day as i64);

    // Generate new CCID
    let new_ccid = runtime_state.ccid.total_ccids;
    runtime_state.ccid.total_ccids += 1;

    // Add CCID to the date's vector
    runtime_state.ccid.ccids_by_date
        .entry(date_key)
        .or_insert_with(Vec::new)
        .push(new_ccid);

    new_ccid
}

// Helper function to convert days since epoch to year, month, day
fn days_to_ymd(days: i64) -> (i32, u8, u8) {
    let year = 1970 + (days / 365) as i32;
    let mut rem_days = days % 365;
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

// Helper function to convert date key back to a readable date string
fn key_to_date_string(key: i64) -> String {
    let year = key / 10000;
    let month = (key % 10000) / 100;
    let day = key % 100;
    format!("{:04}-{:02}-{:02}", year, month, day)
}

// Update the format_date function
#[query]
fn format_date(key: i64) -> String {
    key_to_date_string(key)
}


fn get_date_data_impl(runtime_state: &RuntimeState, date: i64) -> Option<DateData> {
    runtime_state.ccid.ccids_by_date.get(&date).map(|ccids| {
        DateData {
            date,
            ccids: ccids.clone(),
        }
    })
}

// Function to get all dates and their CCIDs
fn get_all_data_impl(runtime_state: &RuntimeState) -> Vec<DateData> {
    runtime_state.ccid.ccids_by_date
        .iter()
        .map(|(&date, ccids)| DateData {
            date,
            ccids: ccids.clone(),
        })
        .collect()
}

#[update]
fn add(name: String) -> u32 {
    RUNTIME_STATE.with(|state| {
        let mut state = state.borrow_mut();
        add_impl(name, &mut state)
    })
}

#[query]
fn get_date_data(timestamp: i64) -> Option<DateData> {
    RUNTIME_STATE.with(|state| {
        let state = state.borrow();
        get_date_data_impl(&state, timestamp)
    })
}

#[query]
fn get_all_data() -> Vec<DateData> {
    RUNTIME_STATE.with(|state| {
        let state = state.borrow();
        get_all_data_impl(&state)
    })
}

// Helper function to convert timestamp to readable date string

// This generates Candid interface definitions from your Rust types and functions
ic_cdk::export_candid!();