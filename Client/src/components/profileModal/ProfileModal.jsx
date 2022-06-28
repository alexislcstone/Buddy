import { Modal, useMantineTheme } from '@mantine/core';
import './styles.css';
// import { Profile } from '../../Data/ProfileData.js'

function ProfileModal({ modalOpen, setModalOpen,user }) {
  const theme = useMantineTheme();

  return (
    <Modal
      radius='3%'
      overlayColor={theme.colorScheme === 'dark' ? theme.colors.dark[9] : theme.colors.gray[2]}
      overlayOpacity={0.55}
      overlayBlur={3}
      size='30%'
      opened={modalOpen}
      onClose={() => setModalOpen(false)
      }
    >
      <form className='formInfo' >
        <div className='formtitle'>Your info</div>
        <div>
          <div className='formLabel'>
            <label>First Name</label>
            <input
              className='infoInput'
              type='text'
              name="firstname"
              placeholder="First Name"
              defaultValue={user.firstname}
            />
          </div>
          <div className='formLabel'>
            <label>Last Name</label>
            <input
              className='infoInput'
              type='text'
              name="lastname"
              placeholder="Last Name"
              defaultValue={user.lastname}
            />
          </div>
        </div>
        <br/>
        <div>
          <div className='formLabel'>
            <label>Works At</label>
            <input
              className='infoInput'
              type='text'
              name="worksat"
              placeholder="Works at"
              defaultValue={user.worksAt}
            />
          </div>
        </div>
        <br/>
        <div>
          <div className='formLabel'>
            <label>Lives In</label>
            <input
              className='infoInput'
              type='text'
              name="city"
              placeholder="City"
              defaultValue={user.city}
            />
          </div>
          <div className='formLabel'>
            <label>From</label>
            <input
              className='infoInput'
              type='text'
              name="from"
              placeholder="From"
              defaultValue={user.from}
            />
          </div>
        </div>
        <br/>
        <div>
          <div className='formLabel'>
            <label>Relationship</label>
            <input
              className='infoInput'
              type='text'
              placeholder="Relationship Status"
              defaultValue={user.relationship}
            />
          </div>
        </div>
        <br />
        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'2rem' }}>
          <span className='labb'>
            <input type="file" id='profileImg' accept="image/png, image/jpeg" hidden />
            <label for='profileImg'>Upload Image</label>
          </span>
          <span className='labb'>
            <input type="file" id='coverImg' accept="image/png, image/jpeg" hidden />
            <label className='imgLabel' for='coverImg'>Upload Cover</label>
          </span>
        </div>
        <button className='button infoButton' type='submit'>Update</button>
      </form>
    </Modal >
  );
}

export default ProfileModal;