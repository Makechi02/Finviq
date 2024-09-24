import {getCorsHeaders} from "@/app/api/options";
import {getServerSession} from "next-auth";
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import axios from "axios";

const SUPPLIERS_BASE_URL = 'https://prior-lauree-makechi-b2d9cdc0.koyeb.app/api/v1/suppliers';

export const GET = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const supplierID = params.id;

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.get(`${SUPPLIERS_BASE_URL}/${supplierID}`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return new Response(JSON.stringify(response?.data), { status: 200, headers });
    } catch (e) {
        console.error(e);
        if (!e.response) {
            return new Response("No server response", { status: 400, headers });
        }
        return new Response("Supplier with id not found", { status: 500, headers });
    }
};

export const PUT = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    const updatedSupplier = await request.json();

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.put(`${SUPPLIERS_BASE_URL}/${params.id}`, updatedSupplier, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return new Response(response.data, {status: 200, headers});
    } catch (e) {
        console.error(e);
        if (e.response.status === 400) {
            return new Response(e.response.data.message, {status: 400, headers});
        }
        return new Response("Failed to update supplier", { status: 500, headers });
    }
};

export const DELETE = async (request, { params }) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);

    const {accessToken} = await getServerSession(authOptions);

    try {
        const response = await axios.delete(`${SUPPLIERS_BASE_URL}/${params.id}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${accessToken}`
            }
        });

        return new Response(response.data, { status: 200, headers });
    } catch (e) {
        return new Response("Failed to delete supplier", { status: 500, headers });
    }
};

export const OPTIONS = async (request) => {
    const origin = request.headers.get('origin');
    const headers = getCorsHeaders(origin);
    return new Response(null, {status: 200, headers});
};
