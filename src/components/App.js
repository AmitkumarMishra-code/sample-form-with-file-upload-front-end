import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import LoadingButton from '@mui/lab/LoadingButton';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InfoIcon from '@mui/icons-material/Info';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import axios from 'axios';
import { Input } from '@mui/material';

const theme = createTheme();

export default function App() {
  const [file, setFile] = React.useState(null)
  const [checked, setChecked] = React.useState(false)
  const [loading, setLoading] = React.useState(false)
  const [submitSuccess, setSubmitSuccess] = React.useState(false)
  const firstNameRef = React.useRef(null)
  const lastNameRef = React.useRef(null)
  const addressRef = React.useRef(null)
  const emailRef = React.useRef(null)

  React.useEffect(() => {
    if(submitSuccess){
      firstNameRef.current.value = ''
      lastNameRef.current.value = ''
      emailRef.current.value=''
      addressRef.current.value=''
      setFile(null)
      setLoading(false)
      setChecked(false)
    }
  }, [submitSuccess])


  const handleSubmit = async(event) => {
    setLoading(true)
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set('checkboxExample', checked)
    if(file){
      data.set('uploadFile', file)
    }
    else{
      data.delete('uploadFile')
    }
    // eslint-disable-next-line no-console

    try{
      await axios.post('https://sample-form-with-file-back-end.herokuapp.com/', data, {
        headers:{
          "Content-type":"multipart/form-data"
        }
      })
      
      setSubmitSuccess(true)
    }
    catch(err){
      console.log(err)
      setLoading(false)
      setSubmitSuccess(false)
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <InfoIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Please Provide Some Basic Information
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  inputRef={firstNameRef}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  inputRef={lastNameRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  inputRef={emailRef}
                />
              </Grid>
              <Grid item xs={12}>
              <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="address"
                  inputRef={addressRef}
                />
              </Grid>
              <Grid item xs={12}>
                <Input
                  style={{display: 'none'}}
                  id="uploadFile"
                  name="uploadFile"
                  type="file"
                  onChange = {(e) => setFile(e.target.files[0])}
                />
                 <label htmlFor="uploadFile">
                  <Button variant="contained" color="primary" component="span">
                      Upload File
                  </Button>
                  <p>{file?.name}</p>
                </label>
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox value="checkboxExample" checked ={checked} color="primary" onChange={(e) => setChecked(e.target.checked)} />}
                  label="Checkbox example"
                />
              </Grid>
            </Grid>
            <LoadingButton
              type="submit"
              fullWidth
              variant="contained"
              loading={loading}
              loadingIndicator="Submitting..."
              sx={{ mt: 3, mb: 2 }}
            >
              Submit
            </LoadingButton>
            <Grid container justifyContent="flex-end">
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}