import React ,{useRef,useEffect,useState} from 'react';
import {useDrag,useDrop} from 'react-dnd'
import Icon from "react-crud-icons";

import "../../node_modules/react-crud-icons/dist/css/react-crud-icons.css";
function Pitches({item ,url,index, deleteItem, moveItem, addItem,board,func}) {
    
    const [isActive, setIsActive] = useState(false);

    const ref = useRef(null)
    const [{isDragging}, drag] = useDrag( {
        type: "Pitches", 
        item: {...item , index:index},
        collect: monitor => ({
            isDragging: !!monitor.isDragging(),

        }),
    });



    const [,drop] = useDrop({
        accept: ["Pitches","PitchesDraggable"],
        drop(item, monitor){
            if(!ref.current){
                return;
            }
            
            const hoverIndex = index;
            const newItem = {
                id: item.id,
                index: 99,
                duration: item.duration,
                type: item.type,
                src: item.src,
             }
            
            if(item.status === false){
            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleX = Math.abs((hoveredRect.left - hoveredRect.right) / 2)
            const hoverActualX =  Math.abs(monitor.getClientOffset().x - hoveredRect.right)
            if (hoverActualX > hoverMiddleX)  {
                console.log("left")
                addItem(newItem, hoverIndex, "appendLeft",board,func)
            }
            // if dragging up, continue only when hover is bigger than middle Y
            if (hoverActualX < hoverMiddleX) {
                console.log("right")
                addItem(newItem, hoverIndex, "appendRight",board,func)
            }

                


                


                return
            }

            else{
               
                const dragIndex = item.index;


            if(dragIndex === hoverIndex){
                return
            }

            const hoveredRect = ref.current.getBoundingClientRect();
            const hoverMiddleX = Math.abs((hoveredRect.left - hoveredRect.right) / 2)
            const hoverActualX =  Math.abs(monitor.getClientOffset().x - hoveredRect.right)

            console.log(hoveredRect)
            console.log(hoverMiddleX)
            console.log(hoverActualX)
            console.log(monitor.getClientOffset())

            

            if (hoverActualX > hoverMiddleX)  {
                console.log("left")
                moveItem(dragIndex, hoverIndex, "appendLeft")
            }
            // if dragging up, continue only when hover is bigger than middle Y
            if (hoverActualX < hoverMiddleX) {
                console.log("right")
                moveItem(dragIndex, hoverIndex, "appendRight")
            }
           
            

            }

            
        }
    })

    useEffect(() => {
        

        
        console.log(item)

        
        
        
    }, [item])

    const changeColor = () => {
        
        setIsActive(true);
    }


    drag(drop(ref));
    /*const [spec, dropRef] = useDrop({
        accept: 'image',
        hover: (image, monitor) => {
            console.log(image.index)
            console.log(index)
            const dragIndex = image.index
            const hoverIndex = index
            const hoverBoundingRect = ref.current?.getBoundingClientRect()
            const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            const hoverActualY = monitor.getClientOffset().y - hoverBoundingRect.top

            // if dragging down, continue only when hover is smaller than middle Y
            if (dragIndex < hoverIndex && hoverActualY < hoverMiddleY) return
            // if dragging up, continue only when hover is bigger than middle Y
            if (dragIndex > hoverIndex && hoverActualY > hoverMiddleY) return

            moveListItem(dragIndex, hoverIndex)
            //console.log(dragIndex)
            //console.log(hoverIndex)
            image.index = hoverIndex
        },
    })

    const ref = useRef(null)
    const dragDropRef = drag(dropRef(ref))*/

    return(
                
        <div  className="flex-pitch" style={{}}>
           <div    className="column" >
           {url !== null 
           ? 
           <div>
        <img 
            ref={ref}
            height="45px" 
            width="45px" 
            src={url.src} 
            style={{border: isDragging ? "5px solid darkblue": "0px"}} 
            
            
        /> </div>
        :<div ref={ref} className='notePlaceholder'   >
            
            <img 
             
            ref={ref}
            height="80px" 
            width="28px" 
            src={require('../media/pitches/EmptyPlace.PNG')} 
            style={{border: isDragging ? "5px solid darkblue": "0px"}} 
            
            
        /> 
         
        </div>
           } 

           </div></div>
        

     
    )
};

export default Pitches;