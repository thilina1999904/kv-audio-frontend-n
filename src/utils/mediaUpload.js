import { createClient } from "@supabase/supabase-js";

// Supabase Keys (මෙහි Localhost කෑලි අයින් කර ඇත)
const anon_key = "sb_publishable_rnmbFIR19szU2dWYbmKB_w_XPutOBgS";
const supabase_url = "https://lgrnvjbgxgmbejhmtsmm.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(file) {
    return new Promise((resolve, reject) => {
        if (file == null) {
            reject("No file selected");
            return;
        }

        // File නම අද්විතීය කිරීමට timestamp එකක් එකතු කිරීම
        const timeStamp = new Date().getTime();
        const fileName = timeStamp + "_" + file.name;

        // Supabase 'images' bucket එකට upload කිරීම
        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        }).then((result) => {
            if (result.error) {
                reject("Upload failed: " + result.error.message);
                return;
            }
            
            // Public URL එක ලබා ගැනීම
            const publicUrl = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
        }).catch((err) => {
            reject("Upload failed: " + err.message);
        });
    });
}