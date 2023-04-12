import { Flex } from "@chakra-ui/react"
import { useEffect, useState } from "react"

interface iProfilePicProps {
  user: string;
  isLarge: boolean;
}
export const ProfilePic = ({user, isLarge}: iProfilePicProps) => {
  const [avatar, setAvatar] = useState<string>("")
  const [color, setColor] = useState<string>("")

  useEffect(() => {
    const avatar = () => {
      let initials = "";
      const name = user.split(" ")
      
      if (name.length === 1) {
        initials = name[0][0]
      }

      if (name.length >= 2) {
        for (var i = 0; i < 2; i++) {
          var firstLetter = name[i][0].toUpperCase();
          initials += firstLetter;
        }
      }
      setAvatar(initials)
    }
    const getRandomColor = () => {
      var randomNumber = Math.floor(Math.random() * 12) + 1;
      const color =  `random.${randomNumber}`;
      setColor(color)
    }
    avatar()
    getRandomColor()
  }, [])
  return (
    <Flex 
    bg={color} 
    w={isLarge ? "104px" : "32px"} 
    h={isLarge ? "104px" : "32px"} 
    borderRadius={"50%"} 
    textStyle={isLarge ? "body_1_500" : "body_2_500"} 
    alignItems={"center"} 
    justifyContent={"center"} 
    p={{base: "15px", md: "17px"}} 
    color={"whiteFixed"}
    >
      {avatar}
    </Flex>
  )
}