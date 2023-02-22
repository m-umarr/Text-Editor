import React, { useState } from "react";

type ElementType = {
  type: string;
  value: string | null;
};

function Editor(): React.ReactElement {
  const [elements, setElements] = useState<ElementType[]>([]);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    type: string
  ) => {
    event.dataTransfer.setData("type", type);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const type = event.dataTransfer.getData("type");
    if (type === "text") {
      setElements([...elements, { type: "text", value: "" }]);
    } else if (type === "image") {
      setElements([...elements, { type: "image", value: null }]);
    }
  };

  const handleTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
    index: number
  ) => {
    const newElements = [...elements];
    newElements[index].value = event.target.value;
    setElements(newElements);
  };

  const handleImageChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newElements = [...elements];
    newElements[index].value = URL.createObjectURL(event.target.files![0]);
    setElements(newElements);
  };

  const renderElement = (element: ElementType, index: number) => {
    if (element.type === "text") {
      return (
        <textarea
          key={index}
          placeholder="Text Area"
          value={element.value as string}
          onChange={(event) => handleTextChange(event, index)}
        />
      );
    } else if (element.type === "image") {
      return (
        <div key={index}>
          {element.value ? (
            <img src={element.value} alt="uploaded" />
          ) : (
            <div>
              <input
                type="file"
                accept="image/*"
                onChange={(event) => handleImageChange(event, index)}
              />
            </div>
          )}
        </div>
      );
    }
  };

  return (
    <div style={{ display: "flex" }}>
      <div
        style={{
          width: "200px",
          height: "100vh",
          border: "1px solid black",
          padding: "20px",
        }}>
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "text")}
          style={{ marginBottom: "10px" }}>
          Text
        </div>
        <div
          draggable
          onDragStart={(event) => handleDragStart(event, "image")}
          style={{ marginBottom: "10px" }}>
          Image
        </div>
      </div>
      <div
        style={{
          flex: 1,
          height: "100vh",
          border: "1px solid black",
          padding: "20px",
        }}
        onDrop={handleDrop}
        onDragOver={(event) => event.preventDefault()}>
        {elements.map(renderElement)}
      </div>
    </div>
  );
}

export default Editor;
