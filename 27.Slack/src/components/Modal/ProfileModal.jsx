import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Input, Stack } from '@mui/material'
import AvatarEditor from 'react-avatar-editor'
import '../../firebase'
import { useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref as refStorage, uploadBytes } from "firebase/storage"
import { getDatabase, ref, update } from "firebase/database"
import { updateProfile } from 'firebase/auth'

function ProfileModal({open, handleClose}) {
  const {user} = useSelector(state => state)
  const [previewImage, setPreviewImage] = useState("")
  const [croppedImage, setCroppedImage] = useState("")
  const [uploadedCroppedImage, setUploadedCroppedImage] = useState("")
  const [blob, setBlob] = useState("")
  const avatarEditorRef = useRef()

  const closeModal = useCallback(() => {
    handleClose()
    setPreviewImage("")
    setCroppedImage("")
    setUploadedCroppedImage("")
  }, [])

  const handleChange = useCallback((e) => {
    const file = e.target.files[0]
    if (!file) return;
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => {
      setPreviewImage(reader.result)
    })
  }, [])

  const handleCropImage = useCallback(() => {
    avatarEditorRef.current.getImageScaledToCanvas().toBlob((blob) => {
      const imageUrl = URL.createObjectURL(blob)
      setCroppedImage(imageUrl)
      setBlob(blob)
    })
  }, [])

  const uploadCroppedImage = useCallback(async () => {
    if (!user.currentUser?.uid) return;
    const storageRef = refStorage(getStorage(), `avatars/users/${user.currentUser.uid}`)
    const uploadTask = await uploadBytes(storageRef, blob)
    const downloadUrl = await getDownloadURL(uploadTask.ref)
    setUploadedCroppedImage(downloadUrl)
  }, [blob])

  useEffect(() => {
    if (!uploadedCroppedImage || !user.currentUser) return;
    async function changeAvator() {
      await updateProfile(user.currentUser, {
        photoURL: uploadedCroppedImage
      })
      const updates = {}
      updates["/users/" + user.currentUser.uid + "/avatar"] = uploadedCroppedImage
      await update(ref(getDatabase()), updates)
      closeModal()
    }
    changeAvator()
  }, [uploadedCroppedImage, user.currentUser])

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>????????? ????????? ??????</DialogTitle>
      <DialogContent>
        <Stack direction='column' spacing={3}>
          <Input
            type='file'
            onChange={handleChange}
            inputProps={{accept:'image/jpeg, image/jpg, image/png'}}
            label='????????? ????????? ????????? ??????'
          />
          <div style={{display:'flex', alignItems:'center'}}>
            {previewImage && (
              <AvatarEditor ref={avatarEditorRef} image={previewImage} width={120} height={120} border={50} scale={2} style={{display:'inline'}}/>
            )}
            {croppedImage && (
              <img alt='cropped' style={{marginLeft:'50px'}} width={100} height={100} src={croppedImage}/>
            )}
          </div>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal}>??????</Button>
        {previewImage && (
          <Button onClick={handleCropImage}>????????? Crop</Button>
        )}
        {croppedImage && (
          <Button onClick={uploadCroppedImage}>????????? ????????? ??????</Button>
        )}
      </DialogActions>
    </Dialog>
  )
}

export default ProfileModal