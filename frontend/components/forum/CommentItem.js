import { Box, Flex, Icon, Spinner, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { CgProfile } from "react-icons/cg";

const CommentItem = ({
  comment,
  onDeleteComment,
  loadingDelete,
  userId,
}) => {
  return (
    <Flex
      border="1px solid"
      bg="white"
      borderColor="gray.300"
      borderRadius={10}
      shadow="sm"
    >
      <Flex m={2}>
        <Box>
          <Icon as={CgProfile} fontSize={30} color="gray.300" mr={2} />
        </Box>
        <Stack spacing={1}>
          <Stack direction="row" align="center" fontSize="8pt">
            <Text fontWeight={600}>{comment.creatorDisplayText}</Text>
            {/* Timestamp conversion logic to display createdAtString can be added here */}
            {loadingDelete && <Spinner size="sm" />}
          </Stack>
          <Text fontSize="10pt">{comment.text}</Text>
          <Stack
            direction="row"
            align="center"
            cursor="pointer"
            color="gray.500"
          >
            {userId === comment.creatorId && (
              <>
                {/* If Edit functionality is not implemented, this can be commented out or removed */}
                <Text fontSize="10pt" _hover={{ color: "red.500" }}>
                  Edit
                </Text>
                <Text
                  fontSize="10pt"
                  _hover={{ color: "red.500" }}
                  onClick={() => onDeleteComment(comment)}
                >
                  Delete
                </Text>
              </>
            )}
          </Stack>
        </Stack>
      </Flex>
    </Flex>
  );
};

export default CommentItem;