use std::{fs, io::Read};

/*
 * 音乐播放模块
 * 在涉及到本地文件时，访问文件，并返回二进制数组
 */
#[tauri::command]
pub async fn get_music_base64(path: &str) -> Result<Vec<u8>, String> {
    let mut file = match fs::File::open(path) {
        Ok(data) => data,
        Err(e) => return Err(e.to_string()),
    };
    let mut buffer = Vec::new();
    match file.read_to_end(&mut buffer) {
        Ok(_) => Ok(buffer),
        Err(e) => Err(e.to_string()),
    }
}
