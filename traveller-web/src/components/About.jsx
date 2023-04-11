import React from 'react';
import { Box, Heading, Text, Stack, VStack, Avatar } from '@chakra-ui/react';

const testimonials = [
  {
    id: 1,
    text:
      "I love using this website to plan my trips. It's so convenient to have all the route and weather information in one place.",
    author: 'Jane Doe',
    avatar:
      'https://randomuser.me/api/portraits/women/82.jpg', // replace with actual avatar url
  },
  {
    id: 2,
    text:
      "I've been using this website for months now and it never disappoints. The weather information is always accurate and the route details are very helpful.",
    author: 'John Smith',
    avatar:
      'https://randomuser.me/api/portraits/men/11.jpg', // replace with actual avatar url
  },
  {
    id: 3,
    text:
      "This is hands down the best travel website I've ever used. It's user-friendly and the information is always up-to-date.",
    author: 'Emily Jones',
    avatar:
      'https://randomuser.me/api/portraits/women/76.jpg', // replace with actual avatar url
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
          <Heading>Testimonials</Heading>
          {testimonials.map((testimonial) => (
            <Box
              key={testimonial.id}
              p={4}
              borderRadius="md"
              boxShadow="md"
              bg="white"
            >
              <Text>"{testimonial.text}"</Text>
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
