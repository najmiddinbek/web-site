import EditTopicForm from "../../../components/Tahrirlash";

const getTopicById = async (id) => {
    try {
        const res = await fetch(`api/topics/${id}`, {
            cache: "no-store",
        });

        if (!res.ok) {
            throw new Error("Failed to fetch topic");
        }

        const data = await res.json();

        // Check if 'topiclar' is defined before attempting to destructure
        const { topiclar } = data || {};

        return { topiclar };
    } catch (error) {
        console.error(error);
        return { topiclar: null }; // You might want to return a default value or handle the error appropriately
    }
};

export default async function EditTopic({ params }) {
    const { id } = params;
    const { topiclar } = await getTopicById(id);

    const { newDarsQoldirish } = topiclar || {};

    return <EditTopicForm id={id} newDarsQoldirish={newDarsQoldirish} />
        ;
}
