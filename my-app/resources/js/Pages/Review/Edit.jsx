import { Box, FormControl, FormLabel, Heading, Textarea, Button, Text, HStack, AlertDialog, AlertDialogOverlay, AlertDialogContent, AlertDialogHeader, AlertDialogBody, AlertDialogFooter, useDisclosure, Spinner } from "@chakra-ui/react";
import React, { useState, useRef } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { router } from "@inertiajs/react";
import { StarIcon } from "@chakra-ui/icons";

const Edit = (props) => {
    const {isOpen: isUpdateOpen, onOpen: onUpdateOpen, onClose: onUpdateClose} = useDisclosure();
    const {isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose} = useDisclosure();
    const cancelRef = useRef();
    const [loading, setLoading] = useState(false);
    const [hoverRating, setHoverRating] = useState(0);
    const [values, setValues] = useState({
        review_id: props.review.id,
        rating: props.review.rating,
        comment: props.review.comment,
    });

    const handleUpdateCheck = (e) => {
        e.preventDefault();
        onUpdateOpen();
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value,
        });
    };

    const handleDeleteCheck = (e) => {
        e.preventDefault();
        onDeleteOpen();
    }
    const handleDelete = (e) => {
        e.preventDefault();
        router.delete(route("review.destroy", { id: values.review_id }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);
        e.target.disabled = true;
        router.post(route('review.update'), values);
    };

    return (
        <>
            <Box p={4} m={4} mx={"auto"} bg={"blue.100"} borderRadius={"md"} boxShadow={"md"} w={{base:"90%", md: 700}}>
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

                <Heading as={"h2"} size={"md"} mb={4} color={"blue.900"}>レビュを編集</Heading>
                <Text fontSize={"xl"} color={"gray.500"} mb={4}>{props.review.shop.name}</Text>
                <form onSubmit={handleUpdateCheck}>
                    <FormControl isRequired mb={4}>
                        <FormLabel id="rating" htmlFor="rating" fontWeight={"bold"}>評価</FormLabel>
                        <HStack spacing={1} p={4}>
                            {Array(5).fill("").map((_, i) =>
                            (
                                <StarIcon
                                    key={i} color={i < values.rating || i < hoverRating ? "yellow.500" : "gray.300"} cursor={"pointer"}
                                    onClick={() => setValues({...values, rating: i + 1})}
                                    onMouseEnter={() => (setHoverRating(i + 1))}
                                    onMouseLeave={() => (setHoverRating(0))}
                                />
                            ))}
                        </HStack>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel htmlFor="comment" fontWeight={"bold"}>コメント</FormLabel>
                        <Textarea name="comment" id="comment" onChange={handleChange} value={values.comment}/>
                    </FormControl>
                    <Button type="submit" colorScheme="green" mt={4}>更新する</Button>
                </form>
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
    );
};
Edit.layout = (page) => <MainLayout children={page} title="レビュー編集"/>
export default Edit;
