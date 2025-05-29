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
        <p className='project-link'><a href={project.linkCode} target='blank' ><img src={github} alt="github icon" /> Code Link</a></p>
        <p className='project-link'><a href={project.linkProject} target='blank' ><img src={link} alt="link icon" /> Project Link</a></p>
      </section>
    ))}
    </>
  )
}