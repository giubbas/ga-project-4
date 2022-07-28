import axios from 'axios'

const ImageUpload = ({ formData, setFormData }) => {

  const uploadUrl = process.env.REACT_APP_CLOUDINARY_URL
  const preset = process.env.REACT_APP_CLOUDINARY_PRESET

  const handleImageUpload = async e => {
    const data = new FormData()

    data.append('file', e.target.files[0])
    data.append('upload_preset', preset)

    const res = await axios.post(uploadUrl, data)

    setFormData({ ...formData, image: res.data.url })
  }
  return (
    <input
      name="image"
      className="image-upload"
      type="file"
      onChange={handleImageUpload}
    />
  )
}

export default ImageUpload