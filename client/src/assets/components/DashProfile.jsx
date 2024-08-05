import { Alert, Button, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytes, uploadBytesResumable } from 'firebase/storage';
import { app } from '../../firebase'

// importing circular progressbar dependencies
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

function DashProfile() {
    const { currentUser } = useSelector(state => state.user);
    const [imageFile, setImageFile] = useState(null);
    const [imageFileUrl, setImageFileUrl] = useState(null);
    const [imageFileUploadingProgress, setImageFileUploadingProgress] = useState(null);
    const [imageFileUploadError, setImageFileUploadError] = useState(null);

    const filePickerRef = useRef();
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(e.target.files[0]);
            setImageFileUrl(URL.createObjectURL(file));
        }
    }
    // Update user profile here with imageFileUrl and other user data
    useEffect(() => {
        if (imageFile) {
            uploadImage();
        }
    }, [imageFile]);

    const uploadImage = async () => {
        // Rules based on data in my Firestore database
        // service firebase.storage {
        //     match / b / { bucket } / o {
        //         match / { allPaths=**} {
        //         allow read;
        //         allow write: if
        //         request.resource.size < 2 * 1024 * 1024 &&
        //                 request.resource.contentType.matches('image/.*')
        //       }
        //     }
        // }

        setImageFileUploadError(null);
        const storage = getStorage(app);
        const fileName = new Date().getTime() + imageFile.name;
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, imageFile);
        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                setImageFileUploadingProgress(progress.toFixed(0));
            },
            (error) => {
                setImageFileUploadError('Couldn\'t upload image (File must be less than 2MB)');
                setImageFileUploadingProgress(null);
                setImageFile(null);
                setImageFileUrl(null);
            },
            // Feedback
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setImageFileUrl(downloadURL);
                });
            }
        );
    };

    return (
        <div className='max-w-lg mx-auto p-3 w-full'>
            <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
            <form className='flex flex-col gap-4'>
                <input type="file" accept='image/*' onChange={handleImageUpload} ref={filePickerRef} hidden />
                <div className='relative size-32 self-center cursor-pointer shadow-md overflow-hidden rounded-full' onClick={() => filePickerRef.current.click()}>

                    {imageFileUploadingProgress && (
                        <CircularProgressbar
                            value={imageFileUploadingProgress || 0}
                            text={`${imageFileUploadingProgress}%`}
                            strokeWidth={5}
                            styles={{
                                root: {
                                    width: '100%',
                                    height: '100%',
                                    position: 'absolute',
                                    top: 0,
                                    left: 0,
                                },
                                path: {
                                    stroke: `rgba(60, 150, 200, ${imageFileUploadingProgress / 100})`
                                }
                            }}
                        />
                    )}

                    <img
                        src={imageFileUrl || currentUser.profilePicture}
                        alt="user" className={`rounded-full size-full object-cover border-8 border-[lightgray] ${imageFileUploadingProgress && imageFileUploadingProgress < 100 && 'opacity-60'}`}
                    />
                </div>
                {imageFileUploadError &&
                    <Alert color='failure'>
                        {imageFileUploadError}
                    </Alert>
                }
                <TextInput type='text' id='username' placeholder='username' defaultValue={currentUser.username} />
                <TextInput type='email' id='email' placeholder='email' defaultValue={currentUser.email} />
                <TextInput type='password' id='password' placeholder='password' />
                <Button type='submit' gradientDuoTone='purpleToBlue' outline>
                    Update
                </Button>
            </form>
            <div className='text-red-500 flex justify-between mt-5'>
                <span className='cursor-pointer hover:underline'>Delete Account</span>
                <span className='cursor-pointer hover:underline'>Sign Out</span>
            </div>
        </div>
    )
}

export default DashProfile