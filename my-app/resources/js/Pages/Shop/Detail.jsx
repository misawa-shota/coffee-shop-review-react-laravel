import React,{ useEffect } from "react";
import MainLayout from "@/Layouts/MainLayout";
import { Box, Button, Heading, Image, Text, Link, useToast, HStack } from "@chakra-ui/react";
import ReviewList from "@/Components/Organisms/ReviewList";
import { EditIcon, SmallAddIcon } from "@chakra-ui/icons";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import '@splidejs/react-splide/css';

const Detail = (props) => {
    const toast = useToast();

    useEffect(() => {
        if (props.status === "review-create") {
            toast({
                position: "top",
                title: 'レビュー投稿成功',
                description: "レビューの投稿が完了しました。",
                status: "success",
                duration: 9000,
                isClosable: true,
            });
        } else if (props.status === "review_updated") {
            toast({
                position: "top",
                title: 'レビュー更新成功',
                description: "レビューの更新が完了しました。",
                status: "info",
                duration: 9000,
                isClosable: true,
            });
        } else if (props.status === "review_deleted") {
            toast({
                position: "top",
                title: 'レビュー削除成功',
                description: "レビューの削除が完了しました。",
                status: "error",
                duration: 9000,
                isClosable: true,
            });
        } else if (props.status === "shop_updated") {
            toast({
                position: "top",
                title: '店舗の更新成功',
                description: "店舗の更新が完了しました。",
                status: "info",
                duration: 9000,
                isClosable: true,
            });
        }
    }, [props.status])

    const options = {
        type: "loop",
        gap: "1rem",
        autoplay: true,
        pauseOnHover: false,
        resetProgress: false,
        height: "15rem",
    };

    return (
        <Box p={4}>
            <HStack spacing={4}>
                <Heading as="h2" size={"xl"} mb={4}>
                    {props.shop.name}
                </Heading>
                <Link href={route('shop.edit', {id: props.shop.id})}>
                    <Button p={2} borderRadius={10} bg={"gray.200"}>
                        <EditIcon/>
                    </Button>
                </Link>
            </HStack>
            {props.shop.shop_images ? (
                <Box w={300}>
                    <Splide
                        options={options}
                        aria-labelledby="autoplay-example-heading"
                    >
                        {props.shop.shop_images.map((image) => (
                            <SplideSlide>
                                <Image
                                    key={image.id}
                                    boxSize="300px"
                                    objectfit="contain"
                                    src={import.meta.env.VITE_APP_URL + "/" + image.file_path}
                                    alt={image.file_name}
                                    mb={4}
                                />
                            </SplideSlide>
                        ))}
                    </Splide>
                </Box>
            ) : (
                <Image
                    boxSize="300px"
                    objectfit="contain"
                    src="https://placehold.jp/300x300.png"
                    alt={props.shop.name}
                    mb={4}
                />
            )}
            <Text mb={2}>{props.shop.description}</Text>
            <Text mb={2}>{props.shop.location}</Text>

            {/* レビュー */}
            <Heading as="h3" size={"lg"} mb={4}>
                レビュー
            </Heading>
            <Box>
                <Link href={`/review/create/shop/${props.shop.id}`}>
                    <Button my={4}><SmallAddIcon/>レビューを書く</Button>
                </Link>
            </Box>
            <Box>
                {props.reviews.length > 0 && <Box mb={2}>({props.reviews.length})</Box>}
            </Box>
            <Box>
                {props.reviews.length === 0 && (
                    <Text>レビューはまだありません</Text>
                )}
                <ReviewList reviews={props.reviews} />
            </Box>
        </Box>
    )
};
Detail.layout = (page) => <MainLayout children={page} title="ショップ詳細" />;

export default Detail;
