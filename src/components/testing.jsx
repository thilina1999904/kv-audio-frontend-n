import { useState } from "react"
import mediaUpload from "../../public/utils/mediaUpload";


export default function Testing() {

    const [file, setFile] = useState(null);

    function uploadFile() {
        console.log(file);
        mediaUpload(file).then((url) => {
            console.log(url);
        });
    }
    return (
        <div className="w-full h-screen bg-red-300 flex flex-col justify-center items-center">

            <input type="file" multiple onChange={(e) => setFile(e.target.files[0])} />
            <button onClick={uploadFile} className="w-[200px] h-[50px] bg-black text-white rounded-lg text-3xl">Upload</button>
        </div>
    )
}
