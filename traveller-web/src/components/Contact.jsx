import React from 'react';
import { Box, Heading, Text, Stack, VStack, SimpleGrid, Icon } from '@chakra-ui/react';
import { FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Contact = () => {
  return (
    <Box p={8}>
      <Stack spacing={8}>
        <VStack spacing={4}>
          <Heading>Contact Us</Heading>
          <Text>
            If you have any questions or feedback. You can reach us by phone or email, or visit one of our
            offices.
          </Text>
        </VStack>

        <SimpleGrid columns={{ sm: 1, md: 2 }} spacing={8}>
          <Box p={4} borderRadius="md" boxShadow="md" bg="white">
            <Icon as={FaMapMarkerAlt} boxSize={8} color="blue.500" mb={2} />
            <Text fontWeight="bold">Head Office</Text>
            <Text>123 Main Street</Text>
            <Text>New York, NY 10001</Text>
            <Text mt={2}>
              <Icon as={FaPhone} boxSize={4} mr={2} />
              (555) 123-4567
            </Text>
          </Box>

          

          <Box p={4} borderRadius="md" boxShadow="md" bg="white">
            <Icon as={FaPhone} boxSize={8} color="blue.500" mb={2} />
            <Text fontWeight="bold">Phone</Text>
            <Text>(555) 555-5555</Text>
          </Box>

          <Box p={4} borderRadius="md" boxShadow="md" bg="white">
            <Icon as={FaEnvelope} boxSize={8} color="blue.500" mb={2} />
            <Text fontWeight="bold">Email</Text>
            <Text>traveller@traveller.com</Text>
          </Box>
        </SimpleGrid>
      </Stack>
    </Box>
  );
};

export default Contact;
