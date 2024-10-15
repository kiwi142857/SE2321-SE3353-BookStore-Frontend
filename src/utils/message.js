export async function handleBaseApiResponse(res, messageApi, onSuccess, onFail) {
    if (res.ok) {
        // log the res.message
        console.log(res.message);
        await messageApi.success(res.message, 0.5);
        onSuccess?.();
    } else {
        await messageApi.error(res.message, 0.5);
        onFail?.();
    }
}