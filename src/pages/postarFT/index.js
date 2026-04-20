import {useState, useEffect} from "react" 
import { FaCamera } from "react-icons/fa";
import { IoArrowBackOutline } from "react-icons/io5";
import "./index.css"
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Loading from "../../components/loading/loading";
import { usePostar } from "../../Hooks/usePostar";

export default function PostaFT(){

    const [img, setImg] = useState(null)
    const [coment,setcoment] = useState('')
    const [preview,setPreview] = useState(null)
    const [load,setload] = useState(false)

    const {Postar} = usePostar()

        useEffect(() => {
            return () => preview && URL.revokeObjectURL(preview) //limpa a URL gerada
        }, [preview])


        async function enviaDados(e){
            e.preventDefault()

            try{
                const formadata = new FormData()

                formadata.append("comentario",coment)

                if(img instanceof File){ //se img for do tipo file 

                    formadata.append("img",img)

                    const data = await Postar({formadata})

                    if(data){
                        setImg(null)
                        setPreview(null)
                        setcoment('')
                        toast.success(data.msg)
                        setload(false)  //esconde o load
                    }
                    

                }else{
                    toast.error("envie uma imagem")
                    setcoment("")
                    setImg(null)
                }                

            }catch(e){
                console.log(e)
            }
        }
    

    return(
        <div>
            <main>
                {load &&
                    <Loading />
                }
                <span><Link to={"/feed"}><IoArrowBackOutline id="seta"/></Link></span>
                <section id="ContFTeForm">
                    <div id="conteinerAddfoto">
                        <div>
                            {img &&
                                <img id="imgPost" src={preview} alt="img"></img>
                            }
                            {!img &&    
                            <FaCamera id="iconePlus"/>
                            }
                            <input id="addFT" type="file" onChange={e =>{
                                const file = e.target.files[0]
                                setImg(file)
                                if(file){
                                    setPreview(URL.createObjectURL(file))
                                }
                            }} ></input>
                        </div>
                    </div>

                    <form onSubmit={e => {
                        enviaDados(e)
                        setload(true) // mostra o loading
                    }} id="textoPost">
                        <textarea type="text" value={coment} onChange={e => setcoment(e.target.value)} placeholder="como esta se sentindo?..."></textarea>
                        <button type="submit">POSTAR</button>
                    </form>
                </section>

            </main>
        </div>
    )
}