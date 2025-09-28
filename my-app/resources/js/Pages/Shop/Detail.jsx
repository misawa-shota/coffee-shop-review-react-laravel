import MainLayout from "@/Layouts/MainLayout";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Heading, HStack, Image, Text } from "@chakra-ui/react";
import ReviewList from "@/Components/Organisms/ReviewList";

const Detail = (props) => {
    return (
        <Box p={4}>
            <Heading as="h2" size={"xl"} mb={4}>
                {props.shop.name}
            </Heading>
            <Image
                boxSize="300px"
                objectfit="contain"
                src="https://placehold.jp/300x300.png"
                alt={props.shop.name}
                mb={4}
            />
            <Text mb={2}>{props.shop.description}</Text>
            <Text mb={2}>{props.shop.location}</Text>

            {/* レビュー */}
            <Heading as="h3" size={"lg"} mb={4}>
                レビュー
            </Heading>
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
