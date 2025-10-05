import React from 'react';
import MainLayout from '@/Layouts/MainLayout';
import { Box, Button, FormControl, FormLabel, Heading, Input, Textarea, Image, useToast } from '@chakra-ui/react';
import { useForm, router, usePage } from '@inertiajs/react';

const Create = () => {
    // const { auth, csrf_token } = usePage().props;
    const { data, setData, post, errors } = useForm({
        name: "",
        location: "",
        description: "",
        images: [],
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
        if ( files.length > 3) {
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

    const handleSubmit = (e) => {
        e.preventDefault();
        router.post(route('shop.store'), data);
    };

    return (
        <Box p={4} m={4} w={{base: "90%", md:700}}>
            <Heading as="h2" fontSize={{base:18, md:24}} mb={6}>
                店舗新規作成
            </Heading>
            <form onSubmit={handleSubmit}>
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
                    {data.images.length > 0 && (
                        <Box display={"flex"} alignItems={"center"} bg={"gray.200"} mb={2} p={4}>
                            {data.images.map((image) => (
                                <Box key={image.name} px={2}>
                                    <Image
                                        src={URL.createObjectURL(image)}
                                        alt={image.name}
                                        w={100}
                                    />
                                </Box>
                            ))}
                        </Box>
                    )}
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
                    作成
                </Button>
            </form>
        </Box>
    )
};
Create.layout = (page) => <MainLayout children={page} title="店舗新規作成" />
export default Create

