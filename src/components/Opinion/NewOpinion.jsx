import { useActionState, use } from "react";
import { OpinionsContext } from "./opinions-context";
import SubmitAction from "./SubmitAction";

const formInitailValues = { errors: null };

export function NewOpinion() {
  const { addOpinion } = use(OpinionsContext);
  async function formOpinionAction(prevFormState, fd) {
    const userName = fd.get('userName');
    const title = fd.get('title');
    const opinion = fd.get('body');

    const errors = [];
    if (!userName.trim()) {
      errors.push('Please provide your name.');
    }

    if (title.trim().length < 5) {
      errors.push('Title must be atleast five characters long.');
    }

    if (opinion.trim().length < 10 || opinion.trim().length > 300) {
      errors.push('Opinion must be between 10 and 300 character long.');
    }

    if (errors.length > 0) {
      return { errors, enteredValues: { userName, title, opinion } }
    }

    await addOpinion({ title, userName, body: opinion })
    return { errors: null }
  }
  const [formState, formAction] = useActionState(formOpinionAction, formInitailValues);

  return (
    <div id="new-opinion">
      <h2>Share your opinion!</h2>
      <form action={formAction}>
        <div className="control-row">
          <p className="control">
            <label htmlFor="userName">Your Name</label>
            <input type="text" id="userName" name="userName" defaultValue={formState.enteredValues?.userName} />
          </p>

          <p className="control">
            <label htmlFor="title">Title</label>
            <input type="text" id="title" name="title" defaultValue={formState.enteredValues?.title} />
          </p>
        </div>
        <p className="control">
          <label htmlFor="body">Your Opinion</label>
          <textarea id="body" name="body" rows={5} defaultValue={formState.enteredValues?.opinion}></textarea>
        </p>

        {
          formState.errors && <ul className="errors">
            {formState.errors.map((e) => <li key={e}>{e}</li>)}
          </ul>
        }
        <SubmitAction />
      </form>
    </div>
  );
}
