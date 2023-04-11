import React from 'react';
import { Box, Heading, Text, Stack, VStack, Avatar } from '@chakra-ui/react';

const testimonials = [



  {
    id: 1,

    author: 'Prudvi raj',
    avatar:
      'https://randomuser.me/api/portraits/men/82.jpg', // replace with actual avatar url
  },
  {
    id: 2,

    author: 'Sandeep Mushkam ',
    avatar:
      'https://randomuser.me/api/portraits/men/11.jpg', // replace with actual avatar url
  },
  {
    id: 3,

    author: 'Pravalika vatte',
    avatar:
      'https://randomuser.me/api/portraits/women/76.jpg', // replace with actual avatar url
  },
  {
    id: 4,

    author: 'Bhavana koganti',
    avatar:
      'https://randomuser.me/api/portraits/women/76.jpg', // replace with actual avatar url
  },
  {
    id: 4,

    author: 'Haresh Peddhagudam ',
    avatar:
      'https://randomuser.me/api/portraits/men/76.jpg', // replace with actual avatar url
  },
];

const About = () => {
  return (
    <Box
      p={8}
      bgImage="url('/background-image.jpg')" // replace with actual background image url
      bgRepeat="no-repeat"
      bgSize="cover"
      bgPosition="center"
    >
      <Stack spacing={8}>
        <VStack spacing={4}>
          <Heading>About Us</Heading>
          <Text>
            We are a team of travel enthusiasts who believe that planning your
            trips should be easy and hassle-free. Our website provides you with
            all the information you need to make your travels smooth and
            enjoyable.
          </Text>
        </VStack>

        <VStack spacing={4}>
          <Heading>Team</Heading>
          {testimonials.map((testimonial) => (
            <Box
              key={testimonial.id}
              p={4}
              borderRadius="md"
              boxShadow="md"
              bg="white"
            >

              <Box display="flex" alignItems="center">
                <Avatar
                  size="sm"
                  name={testimonial.author}
                  src={testimonial.avatar}
                  mr={2}
                />
                <Text fontWeight="bold">{testimonial.author}</Text>
              </Box>
            </Box>
          ))}
        </VStack>
      </Stack>
    </Box>
  );
};

export default About;
