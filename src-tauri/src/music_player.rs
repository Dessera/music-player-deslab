use std::{fs, io::Read};

#[tauri::command]
pub async fn get_music_base64(path: &str) -> Result<Vec<u8>, String> {
	let mut file = fs::File::open(path).unwrap();
	let mut buffer = Vec::new();
	file.read_to_end(&mut buffer).unwrap();
	Ok(buffer)
}