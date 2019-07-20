import 'gestalt/dist/gestalt.css'
import
{
  Avatar,
  Box,
  Button,
  Card,
  Heading,
  Spinner,
  Text,
  TextField
} from 'gestalt'

export const Section = ({ children, title }) =>
(
  <Box padding={2}>
    <Box marginBottom={1}>
      <Heading size="xs">{title}</Heading>
    </Box>
    {children}
  </Box>
)
