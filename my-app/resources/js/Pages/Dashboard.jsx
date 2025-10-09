import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Box, Link, Button, Heading } from '@chakra-ui/react';
import { Head, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Dashboard() {
    const {auth} = usePage().props;

    return (
            <Box>
                <Head title="Dashboard" />
                <Heading>ダッシュボード</Heading>
                <Box m={4}>
                    <Link href={route("review.indexByUser", {userId: auth.user.id})}>
                        <Button colorScheme={"blue"}>投稿したレビュー</Button>
                    </Link>
                </Box>
                <Box m={4}>
                    <Link href={route("shop.indexByUser", {userId: auth.user.id})}>
                        <Button colorScheme={"green"}>投稿した店舗</Button>
                    </Link>
                </Box>
            </Box>
    );
}
Dashboard.layout = (page) => <MainLayout children={page} title={"Dashboard"} />
