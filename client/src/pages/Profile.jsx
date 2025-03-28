import {
  Form,
  redirect,
  useNavigation,
  useOutletContext,
} from "react-router-dom";
import customFetch from "../utils/customFetch";
import { toast } from "react-toastify";
import { FormRow } from "../components";

export const action = async ({request}) => {
  
  const formData = await request.formData(); 
  const file = formData.get('avatar');

  if(file && file.size > 500000) {
   toast.error('File size too large')
   return null; 
  }

  try {
  const {data} = await customFetch.patch('/users/update-user', formData);
  toast.success('Profile updated successfully')
  } catch (error) {
    toast.error(error?.response?.data?.msg);
  }

  return null;
}

function Profile() {
  
const {user} = useOutletContext();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === 'submitting';

  return (
    <section>
    
      <Form method='post' encType="multipart/form-data">
        <h2>Update Profile</h2>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6'>
        <div className='flex flex-col gap-y-2'>
      <label htmlFor='avatar' className=' capitalize'>
        select an image file (max: 0.5MB)
      </label>
      <input
        type='file'
        id='avatar'
        name='avatar'
        accept="image/*"
        className='border-2 border-[#e4e4e4] outline-none p-2 rounded-md'
      />
    </div>
          <FormRow name='name' type='text' defaultValue={user.name} />
          <FormRow name='lastName' type='text' defaultValue={user.lastName} labelText='last name' />
          <FormRow name='email' type='text' defaultValue={user.email} />
          <FormRow name='location' type='text' defaultValue={user.location} />
        </div>
        <button
          type='submit'
          className='form-btn w-40 mt-5'
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Submit"}
        </button>
      </Form>
    </section>
  )
}

export default Profile