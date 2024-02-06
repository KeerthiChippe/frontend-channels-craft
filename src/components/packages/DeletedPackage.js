import { useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import { startGetDeletedPackage, startGetPackage, startRemovePackage, startUndoPackage } from "../../actions/package-action"

const DeletedPackage = ()=>{
    const dispatch = useDispatch()
    
    const packages = useSelector((state)=>{
        return state.package.deletedPackages.filter((ele)=>ele.isDeleted === true)
    })
    // console.log(packages, "check")

    useEffect(()=>{
        // dispatch(startGetPackage({isDeleted: true}))
        // dispatch(startRemovePackage())
        dispatch(startGetDeletedPackage())
    }, [dispatch])

    const handleUndo = (id)=>{
        dispatch(startUndoPackage(id))
        alert('Package successfully restored')
    }

    return (
        <div>
            <h2>Undo deleted packages</h2>
            <ul>
                {packages.map((ele)=>{
                    return <li key={ele.id}> {ele.packageName} 
                    <button onClick={()=>{
                        handleUndo(ele._id)
                    }}>undo</button>
                    </li>
                })}
            </ul>
        </div>
    )
}
export default DeletedPackage