import company from '../../assets/image/following/img_company.gif'
import '../../themes/About/index.scss'

const About = () => {
  return (
    <div className='about'>
      <div className='about_text'>关于我们</div>
      <div className='about_img'>
        <img src={company} alt="" />
      </div>
    </div>
  )
}
export default About