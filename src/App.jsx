
import { CgMusicSpeaker } from 'react-icons/cg';
import './App.css'
import './index.css'
// import { MdOutlineBluetoothSearching } from "react-icons/md";
import { BsGraphDownArrow } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa";
import { LuUsers } from 'react-icons/lu';


function App() {


  return (
    <div className='w-full h-screen flex'>
      <div className='w-[300px] h-full bg-green-200 '>
        <button className='w-full h-[40px] text-2xl font-bold bg-blue-200 flex justify-center items-center'><BsGraphDownArrow/>Dashboard</button>
        <button className='w-full h-[40px] text-2xl font-bold flex justify-center items-center'><FaRegBookmark/> Bookings</button>
        <button className='w-full h-[40px] text-2xl font-bold flex justify-center items-center'><CgMusicSpeaker/>Items</button>
        <button className='w-full h-[40px] text-2xl font-bold flex justify-center items-center'><LuUsers/>Users</button>
      </div>

      <div className='w-full bg-red-400'>
       
      </div>
    </div>

  )
}

export default App
