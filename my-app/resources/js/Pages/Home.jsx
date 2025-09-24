import react from "react";
import { Box, Heading, VStack, HStack, Image, Text, IconButton, Menu, MenuList, MenuItem, MenuButton, Link } from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon, StarIcon } from "@chakra-ui/icons";

const Home = (props) => {
    return (
        <>
            <Box bg={"orange.800"}>
                <HStack justifyContent={"space-between"} alignItems={"center"} py={{base: 0, md: 3}} px={{base: 1, md: 2}}>
                    <Heading as="h1" size={{base: "xs", md: "md"}} color={"white"}>
                        <Link href="/home" _hover={{color: "gray.500"}}>{import.meta.env.VITE_APP_NAME}</Link>
                    </Heading>
                    {/* PC表示 */}
                    <HStack display={{base: "none", md: "flex"}} color={"white"} fontWeight={"bold"}>
                        <Link href="#" _hover={{color: "gray.500"}}>マイページ</Link>
                        <Link href="#" _hover={{color: "gray.500"}}>店舗の登録</Link>
                    </HStack>
                    {/* SP表示 */}
                    <Box display={{base: "block", md: "none"}} px={{base: 1, md: "none"}} py={{base: 2, md: "none"}}>
                        <Menu>
                            <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon/>} variant="outline"/>
                            <MenuList>
                                <MenuItem icon={<SettingsIcon/>}>マイページ</MenuItem>
                                <MenuItem>店舗の登録</MenuItem>
                            </MenuList>
                        </Menu>
                    </Box>
                </HStack>
            </Box>
            <Box p={4}>
                <Heading fontSize={{base:"24px", md:"40px", lg:"56px",}} mb={2}>
                    ショップ一覧
                </Heading>
                <VStack spacing={4} align="stretch">
                    {props.shops.map((shop) => (
                        <Box key={shop.id} p={4} borderWidth={"1px"} borderRadius={"lg"} overflow={"hidden"} boxShadow={"lg"}>
                            <HStack spacing={4}>
                                <Image
                                boxSize="100px"
                                objectFit="cover"
                                src="https://placehold.jp/100x100.png"
                                alt={shop.name}/>
                                <VStack align="start">
                                    <Heading as="h3" size="md">
                                        {shop.name}
                                    </Heading>
                                    <Text>{shop.description}</Text>
                                </VStack>
                            </HStack>
                        </Box>
                    ))}
                </VStack>
                <Heading as="h2" fontSize={{base:"24px", md:"40px", lg:"56px",}} mt={8} mb={2}>新着レビュー</Heading>
                <VStack spacing={4} align={"stretch"}>
                    {props.newReviews.map((review) => (
                        <Box key={review.id} p={4} borderWidth={"1px"} borderRadius={"lg"} overflow={"hidden"} boxShadow={"lg"}>
                            <VStack align={"start"}>
                                <Text fontWeight={"bold"}>{review.user.name}</Text>
                                <Text>{review.comment}</Text>
                                <HStack spacing={1}>
                                    {Array(5).fill("").map((_,i) => (
                                        <StarIcon key={i} color={i < review.rating ? "yellow.500" : "gray.300"}></StarIcon>
                                    ))}
                                </HStack>
                            </VStack>
                        </Box>
                    ))}
                </VStack>
            </Box>
            <Box>
                <Box bg={"orange.800"} color={"white"} fontWeight={"bold"} textAlign={"center"} py={{base: 2, md: 3}}>
                    <Text fontSize={{base: 13, md: 16}}>&copy; 2024 {import.meta.env.VITE_APP_NAME}</Text>
                </Box>
            </Box>
        </>
    );
}

export default Home;
