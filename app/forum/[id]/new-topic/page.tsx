import Container from "@/components/Container";
import PageTitle from "@/components/PageTitle";
import NewTopicForm from "./form";

const NewTopic = () => {
  return (
    <Container>
      <PageTitle className="mb-10">Create new topic</PageTitle>
      <div className="sm:shadow-xl sm:bg-white sm:dark:bg-neutral-950 w-full sm:w-auto rounded sm:px-8 sm:py-12">
        <NewTopicForm />
      </div>
    </Container>
  );
};

export default NewTopic;
