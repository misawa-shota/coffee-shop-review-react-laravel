import React, {useRef, useState} from 'react'
import MainLayout from '@/Layouts/MainLayout';
import { Input, Box, FormControl, FormLabel, Heading, Textarea, Button, Text, HStack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, Spinner, useToast, Image, IconButton } from "@chakra-ui/react";
import { useForm, router } from '@inertiajs/react';
import { CloseIcon } from '@chakra-ui/icons';

const Edit = (props) => {
    const {isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose} = useDisclosure();
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure();
    const cancelRef = useRef();
    const [loading, setLoading] = useState(false);
    const existingImages = props.shop.shop_images
        ?
            props.shop.shop_images.map((image) => ({
                id: image.id,
                file_name: image.file_name,
                file_path: image.file_path,
            }))
        :
            [];

    const { data, setData, post, errors } = useForm({
        id: props.shop.id,
        name: props.shop.name,
        location: props.shop.location,
        description: props.shop.description,
        images: [],
        existingImages: existingImages, //すでに登録されている画像
    });

    const handleNameChange = (e) => {
        setData("name", e.target.value);
    };

    const handleLocationChange = (e) => {
        setData("location", e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setData("description", e.target.value);
    };

    const toast = useToast();
    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        if ( files.length + data.existingImages.length > 3) {
            toast({
                title: "画像は3つまでです",
                status: "error",
                duration: 5000,
                isClosable: true,
            })
            e.target.value = "";
            return;
        }
        setData("images", files);
    };

    const handleUpdateCheck = (e) => {
        e.preventDefault();
        onUpdateOpen();
    };

    const handleDeleteCheck = (e) => {
        e.preventDefault();
        onDeleteOpen();
    };

    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route("shop.destroy", { id: data.id }));
    };

    // 画像削除
    const handleRemoveImage = (index, type) => {
        if(type === "existing"){
            return (e) => {
                const images = data.existingImages;
                // index番目の要素を削除し、その後の要素を詰める
                images.splice(index, 1);
                setData("existingImages", images);
            };
        } else if(type === "new"){
            return (e) => {
                const images = data.images;
                // index番目の要素を削除し、その後の要素を詰める
                images.splice(index, 1);
                setData("images", images);

                // getElementByIdでinput要素を複数取得する
                const dataTransfer = new DataTransfer();
                const imageFiles = document.getElementById('images').files;

                Array.from(imageFiles).forEach((file, i) => {
                    if(i !== index){
                        dataTransfer.items.add(file);
                    }
                });
                document.getElementById("images").files = dataTransfer.files;
            };
        };
    };



    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        router.post(route('shop.update'), data);
    };

    return (
        <>
            <Box p={4} m={4} w={{base: "90%", md:700}}>
                {/* 更新確認ダイアログ */}
                <>
                    <AlertDialog
                    isOpen={isUpdateOpen}
                    leastDestructiveRef={cancelRef}
                    onClose={onUpdateClose}
                    >
                        <AlertDialogOverlay>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                    更新確認
                                </AlertDialogHeader>
                                <AlertDialogBody>
                                    この内容で更新しますか？
                                </AlertDialogBody>
                                <AlertDialogFooter>
                                    <Button ref={cancelRef} onClick={onUpdateClose}>
                                        キャンセル
                                    </Button>
                                    <Button colorScheme={"green"} ml={3} onClick={handleSubmit}>
                                        {loading ? <Spinner /> : "更新する"}
                                    </Button>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialogOverlay>
                    </AlertDialog>
                </>
                <Heading as="h2" fontSize={{base:18, md:24}} mb={6}>
                    店舗の編集
                </Heading>
                <form onSubmit={handleUpdateCheck}>
                    <FormControl id='name' mb={4} isRequired>
                        <FormLabel>店舗名</FormLabel>
                        <Input
                            type="text"
                            id="name"
                            name="name"
                            value={data.name}
                            onChange={handleNameChange}
                        />
                    </FormControl>
                    <FormControl id='location' mb={4} isRequired>
                        <FormLabel>場所</FormLabel>
                        <Input
                            type="text"
                            id="location"
                            name="location"
                            value={data.location}
                            onChange={handleLocationChange}
                        />
                    </FormControl>
                    <FormControl id='description' mb={4} isRequired>
                        <FormLabel>説明</FormLabel>
                        <Textarea
                            id="description"
                            name="description"
                            value={data.description}
                            onChange={handleDescriptionChange}
                        />
                    </FormControl>
                    <FormControl id="images" mb={4}>
                        <FormLabel fontWeight={"bold"}>画像</FormLabel>
                        {/* プレビュー */}
                        <Box display={"flex"} alignItems={"center"} bg={"gray.200"} mb={2} p={4}>
                            {data.existingImages.length > 0 && (
                                data.existingImages.map((image, index) => (
                                    <Box key={image.id} px={2} position={"relative"}>
                                        <Image
                                            src={import.meta.env.VITE_APP_URL + "/" + image.file_path}
                                            alt={image.file_name}
                                            w={100}
                                        />
                                        <IconButton
                                            isRound={true}
                                            position={"absolute"}
                                            top={{base: -4, md: -5}}
                                            right={0}
                                            variant='solid'
                                            colorScheme='gray'
                                            aria-label='Done'
                                            fontSize={{base:"xs", md:"sm"}}
                                            icon={<CloseIcon />}
                                            onClick={handleRemoveImage(index, "existing")}
                                        />
                                    </Box>
                                ))
                            )}
                            {data.images.length > 0 && (
                                data.images.map((image, index) => (
                                    <Box key={image.name} px={2} position={"relative"}>
                                        <Image
                                            src={URL.createObjectURL(image)}
                                            alt={image.name}
                                            w={100}
                                        />
                                        <IconButton
                                            isRound={true}
                                            position={"absolute"}
                                            top={{base: -4, md: -5}}
                                            right={0}
                                            variant='solid'
                                            colorScheme='gray'
                                            aria-label='Done'
                                            fontSize={{base:"xs", md:"sm"}}
                                            icon={<CloseIcon />}
                                            onClick={handleRemoveImage(index, "new")}
                                        />
                                    </Box>
                                ))
                            )}
                        </Box>
                        <Input
                            type="file"
                            id="images"
                            name="images"
                            accept='.jpg,.jpeg,.png'
                            multiple
                            onChange={handleImageChange}
                        />
                    </FormControl>
                    <Button type='submit' colorScheme={"teal"}>
                        更新
                    </Button>
                </form>
            </Box>
            <Box>

            </Box>
            {/* 削除確認ダイアログ */}
            <>
                <AlertDialog
                isOpen={isDeleteOpen}
                leastDestructiveRef={cancelRef}
                onClose={onDeleteClose}
                >
                    <AlertDialogOverlay>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                削除確認
                            </AlertDialogHeader>
                            <AlertDialogBody>
                                本当に削除しますか？
                            </AlertDialogBody>
                            <AlertDialogFooter>
                                <Button ref={cancelRef} onClick={onDeleteClose}>
                                    キャンセル
                                </Button>
                                <Button colorScheme={"red"} ml={3} onClick={handleDelete}>
                                    {loading ? <Spinner /> : "削除する"}
                                </Button>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialogOverlay>
                </AlertDialog>
            </>
            <Box display={"flex"} justifyContent={"center"}>
                <form onSubmit={handleDeleteCheck}>
                    <Button
                        type="submit"
                        colorScheme={"red"}
                        m={4}
                    >
                        削除する
                    </Button>
                </form>
            </Box>
        </>
    )
}

Edit.layout = (page) => <MainLayout children={page} title={"店舗編集画面"} />
export default Edit;
