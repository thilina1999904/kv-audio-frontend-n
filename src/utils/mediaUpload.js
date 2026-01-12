import { createClient } from "@supabase/supabase-js";

const anon_key = "sb_publishable_rnmbFIR19szU2dWYbmKB_w_XPutOBgS";
const supabase_url = "https://lgrnvjbgxgmbejhmtsmm.supabase.co";

const supabase = createClient(supabase_url, anon_key)

export default function mediaUpload(file) {

    return new Promise((resolve, reject) => {

        if(file == null) {
            reject("No file selected");
            return;
        }

        const timeStamp = new Date().getTime();
        const fileName = timeStamp + file.name;

        supabase.storage.from("images").upload(fileName, file, {
            cacheControl: '3600',
            upsert: false
        }).then(() => {

            const publicUrl = supabase.storage.from('images').getPublicUrl(fileName).data.publicUrl;
            resolve(publicUrl);
        }).catch(()=>{
            reject("Upload failed");
        })

    });


}

