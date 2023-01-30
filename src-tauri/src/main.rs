#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

use music_player_deslab::music_player::*;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet, get_music_base64])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
