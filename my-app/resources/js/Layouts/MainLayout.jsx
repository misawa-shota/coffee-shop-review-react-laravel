import React from "react";
import { Link as InertiaLink, usePage } from "@inertiajs/react";
import { Box, Heading, HStack, Text, IconButton, Menu, MenuList, MenuItem, MenuButton, Link, Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton, useDisclosure,
  Button,
  VStack} from "@chakra-ui/react";
import { HamburgerIcon, SettingsIcon } from "@chakra-ui/icons";
const MainLayout = ({ children }) => {
    const { auth } = usePage().props;

    const { isOpen, onOpen, onClose } = useDisclosure();
    const btnRef = React.useRef();
    return (
        <>
            <Drawer
                isOpen={isOpen}
                placement='right'
                onClose={onClose}
                finalFocusRef={btnRef}
                size={{base: "xs", md: "md"}}
            >
            <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>menu</DrawerHeader>
                    <DrawerBody>
                        <VStack>
                            {auth.user ? (
                                <Box display={"block"}>
                                    <Text fontSize={"xs"} mb={4}>{auth.user.name}さん</Text>
                                    <VStack>
                                        <Link href={route('dashboard')} _hover={{color: "gray.500"}}>マイページ</Link>
                                        <Link href="#" _hover={{color: "gray.500"}}>店舗の登録</Link>
                                        <InertiaLink href={route('logout')} method="post" _hover={{color: "gray.500"}}>ログアウト</InertiaLink>
                                    </VStack>
                                </Box>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        ログイン
                                    </Link>

                                    <Link
                                        href={route('register')}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        新規登録
                                    </Link>
                                </>
                            )}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
            <header>
                <Box bg={"orange.800"}>
                    <HStack justifyContent={"space-between"} alignItems={"center"} py={{base: 0, md: 3}} px={{base: 1, md: 2}}>
                        <Heading as="h1" size={{base: "xs", md: "md"}} color={"white"}>
                            <Link href={route("shop.index")} _hover={{color: "gray.500"}}>{import.meta.env.VITE_APP_NAME}</Link>
                        </Heading>
                        {/* PC表示 */}
                        <HStack display={{base: "none", md: "flex"}} color={"white"} fontWeight={"bold"}>
                            {auth.user ? (
                                <Box>
                                    <Text onClick={onOpen} cursor={"pointer"} ref={btnRef} display={"flex"} alignItems={"center"}>{auth.user.name}さん<SettingsIcon mx={1}/></Text>
                                </Box>
                            ) : (
                                <>
                                    <Box>
                                        <Link href={route("login")}>
                                            <Button colorScheme={"white"} variant={"outline"} _hover={{bg:"gray.500"}}>ログイン</Button>
                                        </Link>
                                    </Box>
                                    <Box>
                                        <Link href={route("register")}>
                                            <Button colorScheme={"blue"}>新規登録</Button>
                                        </Link>
                                    </Box>
                                </>
                            )}
                        </HStack>
                        {/* SP表示 */}
                        <Box display={{base: "block", md: "none"}} px={{base: 1, md: "none"}} py={{base: 2, md: "none"}}>
                            <HamburgerIcon ref={btnRef} onClick={onOpen} cursor={"pointer"} fontSize={"xl"}/>
                            {/* <Menu>
                                <MenuButton as={IconButton} aria-label="Options" icon={<HamburgerIcon/>} variant="outline"/>
                                <MenuList>
                                    <MenuItem icon={<SettingsIcon/>}>マイページ</MenuItem>
                                    <MenuItem>店舗の登録</MenuItem>
                                </MenuList>
                            </Menu> */}
                        </Box>
                    </HStack>
                </Box>
            </header>
            <div>{children}</div>
            <footer>
                <Box>
                    <Box bg={"orange.800"} color={"white"} fontWeight={"bold"} textAlign={"center"} py={{base: 2, md: 3}}>
                        <Text fontSize={{base: 13, md: 16}}>&copy; 2024 {import.meta.env.VITE_APP_NAME}</Text>
                    </Box>
                </Box>
            </footer>
        </>
    );
}
export default MainLayout;
