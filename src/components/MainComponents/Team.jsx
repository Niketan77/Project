import profile from '../../assets/profile.png'
import profile1 from '../../assets/profile1.png'
import profile2 from '../../assets/profile2.png'

const Team = () => {
  return (
    <div className="bg-white h-max rounded-lg my-5 p-6" id="Team">
      <div className="text-2xl text-[#0F1629] font-semibold">Team</div>
      <div className="text-[#0F1629] text-[16px] my-4 pt-2">
        Lorem ipsum dolor sit amet consectetur. Id consequat adipiscing arcu
        nibh. Eget mattis in mi integer sit egestas. Proin tempor id pretium
        quam. Facilisis purus convallis quam augue.
      </div>
      <Card
        name="John Smith"
        des="Designation here"
        link={profile}
      />
      <Card
        name="Elina Williams"
        des="Designation here"
        link={profile1}
      />
      <Card
        name="John Smith"
        des="Designation here"
        link={profile2}
      />
    </div>
  );
}

const Card = ({ name, link, des }) => {
  return (
    <div className="flex bg-[#E8F4FD] rounded-lg py-3 px-6 my-6">
      <div className="justify-center flex flex-col items-center">
        <div>
          <img className="rounded-md w-[300px] h-[100px]" src={link} alt="profile" />
        </div>
        <div className="text-[#0F1629] text-[16px] font-bold py-1">
          {name}
        </div>
        <div className="text-[#788F9B] text-[11px] font-medium">{des}</div>
      </div>
      <div className="flex justify-center items-center px-4 ml-4 text-[#0F1629] text-lg font-normal">
        Lorem ipsum dolor sit amet consectetur. In justo rutrum sit sit
        fermentum ut libero hendrerit id. Tellus sit ornare netus sagittis in
        nunc convallis mattis maecenas. Tempus arcu leo sociis laoreet nec neque
        sed pellentesque viverra. Consectetur proin amet ut id facilisi quis
        consectetur. Tellus gravida ultricies feugiat sed eu egestas dolor est
        ipsum. Malesuada etiam mi gravida praesent interdu
      </div>
    </div>
  );
}

export default Team;