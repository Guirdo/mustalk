import { SaveFloppyDisk } from "iconoir-react";

function SaveBtn() {
    return (
        <div className="post-action post-action--save">
            <span>
                <SaveFloppyDisk strokeWidth={2}/>
            </span>
            <span
                className="post-action__text"
            >
                Save
            </span>
        </div>
    );
}

export default SaveBtn;