import { useDispatch, useSelector } from 'react-redux'
import TareaCard from '../Tarea/TareaCard/TareaCard'


const ListaTarea = () => {


 
 
 return (
    <div className='space-y-3 w-[67vw]'>
      <div className='space-y-5'>
        {[1, 1, 1, 1].map((item) => <TareaCard />)}
      </div>

    </div>
  )
}

export default ListaTarea