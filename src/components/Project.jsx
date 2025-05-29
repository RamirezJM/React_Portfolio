import github from '../assets/github.svg'
import link from '../assets/link.svg'
export default function Project({data}){
  return(
    <>
    {data.map(project =>(
      <section className="card" key={project.id}>

        <h3>{project.title}</h3>
        <img src={project.img.src} alt={project.img.alt} />
        <p>{project.description}</p>
        <p><a href={project.linkCode}><img src={github} alt="github icon" /> Code Link</a></p>
        <p><a href={project.linkProject}><img src={link} alt="link icon" /> Project Link</a></p>
      </section>
    ))}
    </>
  )
}