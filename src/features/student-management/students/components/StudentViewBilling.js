import TimerIcon from '@mui/icons-material/Timer';
import Avatar from '@mui/material/Avatar';
import AvatarGroup from '@mui/material/AvatarGroup';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CustomChip from 'components/mui/chip';

const UserViewBilling = () => {
  const cardData = [
    {
      classname: 'Introduction to App',
      location: 'Kumbakonam',
      duration: '5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Introduction to web',
      location: 'Kumbakonam',
      duration: '2hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Block chain',
      location: 'Kumbakonam',
      duration: '3.5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Figma',
      location: 'Kumbakonam',
      duration: '5hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    },
    {
      classname: 'Analysis',
      location: 'Kumbakonam',
      duration: '1hr',
      dateandtime: 'Sun Jun 26, 2024 / 10:00 am',
      image: 'https://www.shutterstock.com/image-photo/portrait-cheerful-male-international-indian-260nw-2071252046.jpg',
      avatar: '/images/avatars/1.png',
      friends: [
        'https://images.hindustantimes.com/rf/image_size_640x362/HT/p1/2015/03/18/Incoming/Pictures/1327679_Wallpaper2.jpg',
        'https://media.istockphoto.com/id/1272815911/photo/young-indian-female-university-student-stock-photo.jpg?s=612x612&w=0&k=20&c=Iwdc08GR3pw8_Qg3_nabNJUQYTo52EU3dvW4tsth1tE=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q=',
        'https://media.istockphoto.com/id/1369754239/photo/university-student-in-white-background-stock-photo.jpg?s=612x612&w=0&k=20&c=LjFVDfjusWBjYTNliHV9DyXfApPGc8DmgBGEtfVgQ0Q='
      ]
    }
    // Add more card data as needed
  ];

  return (
    <Grid container spacing={4}>
      {cardData.map((card, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>
          <Card
            sx={{
              position: 'relative',
              borderTop: card.status === 'active' ? '4px solid green' : '4px solid #7cf2e1'
            }}
          >
            <CardContent>
              <Box
                sx={{
                  mt: 2.55,
                  mb: 1.85,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between'
                }}
              >
                <Box sx={{ mr: 2, display: 'flex', flexDirection: 'column' }}>
                  <Typography variant="h3">{card.classname}</Typography>
                  <Typography variant="body2">{card.location}</Typography>
                </Box>

                <Box
                  sx={{
                    borderRadius: '10%',
                    border: '1px solid grey',
                    padding: '3px 9px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    '& .MuiTypography-body2': {
                      margin: 0
                    }
                  }}
                >
                  <Typography variant="body2">{card.duration}</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 2.55, display: 'flex', alignItems: 'center' }}>
                <TimerIcon sx={{ marginRight: 1 }} />
                <Typography variant="body2">{card.dateandtime}</Typography>
              </Box>
              <Box
                sx={{
                  gap: 2,
                  display: 'flex',
                  flexWrap: 'wrap',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <AvatarGroup max={4} sx={{ width: 40, height: 40, '& .MuiAvatar-root': { width: 32, height: 32 } }}>
                  {card.friends.map((friend, friendIndex) => (
                    <Avatar key={friendIndex} src={friend} alt={`Friend ${friendIndex + 1}`} />
                  ))}
                </AvatarGroup>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <CustomChip rounded size="small" skin="light" color={'secondary'} label={'BATPATID00001'} />
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />

              <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', textDecoration: 'none' }}>
                <Button variant="tonal" sx={{ px: 2 }}>
                  View Attendance
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default UserViewBilling;
