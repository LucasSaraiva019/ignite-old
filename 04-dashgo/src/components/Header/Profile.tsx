
import { Flex, Text, Box, Avatar } from '@chakra-ui/react'

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Lucas Saraiva</Text>
          <Text color="gray.300" fontSize="small">lucas.saraiva019@gmail.com</Text>
        </Box>
      )}
      <Avatar size="md" name="Lucas Saraiva" src="https://github.com/lucassaraiva019.png" />
    </Flex>

  )
}