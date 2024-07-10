import { useDispatch, useSelector } from 'react-redux'
import TareaCard from '../Tarea/TareaCard/TareaCard'
import { fetchTasks } from '../../Redux/TaskSlice'
import { useLocation } from 'react-router-dom'
import { useEffect } from 'react'

const ListaTarea = () => {
  const dispatch = useDispatch()
  const {task} = useSelector((store) => store)
  const locatio=useLocation();
  const queryParams=new URLSearchParams(locatio.search); 
  const filterValue=queryParams.get("filter");


  useEffect(() => {
    dispatch(fetchTasks({status:filterValue}));
  },[filterValue]);
  console.log("task", task)
 return (
    <div className='space-y-3 w-[67vw]'>
      <div className='space-y-5'>
        {task.tasks.map((item) => <TareaCard item={item}/>)}
      </div>

    </div>
  )
}

export default ListaTarea