'use client';
import { DEFAULT_CARDS } from '@/conf/data';
import { cn } from '@/lib/utils';
import {
  Circle,
  Clock,
  CrossIcon,
  Flame,
  Minus,
  Plus,
  Trash,
} from "lucide-react";
import React, { useState } from "react";
import { Button } from "./ui/button";

import { motion } from "framer-motion";
import CreateTaskForm from "./ui/modals/CreatetaskForm";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@radix-ui/react-dialog";
import { stat } from "fs";

interface ColumnProps {
  title: string;
  headingColor: string;
  column: string;
  cards: typeof DEFAULT_CARDS;
  setCards: Function;
}
interface CardProps {
  title: string;
  id: string;
  column: string;
  createdAt: string;
  tags: string[];
  handleDragStart: Function;
}

interface DropIndicatorProps {
  before: string;
  column: string;
}

const TaskBoard = () => {
  return (
    <div className="w-full h-[90vh]">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState(DEFAULT_CARDS);
  return (
    <div className="flex gap-3 p-12 w-full h-full overflow-scroll">
      <Column
        title="To Do"
        headingColor="text-red-500"
        column="todo"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In Progress"
        headingColor="text-yellow-500"
        column="in-progress"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="In Review"
        headingColor="text-orange-500"
        column="in-review"
        cards={cards}
        setCards={setCards}
      />
      <Column
        title="Done"
        headingColor="text-green-500"
        column="done"
        cards={cards}
        setCards={setCards}
      />
      {/* <DropZone setCards={setCards} /> */}
    </div>
  );
};

const Column = ({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: ColumnProps) => {
  const [activeCard, setActiveCard] = useState(false);
  const filteredCards = cards.filter((card) => card.column === column);
  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    card: CardProps
  ) => {
    e.dataTransfer.setData("cardId", card.id);
    setActiveCard(true);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    highlightIndicator(e);
    setActiveCard(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    clearHighlights();
    setActiveCard(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    setActiveCard(false);
    clearHighlights();

    const cardId = e.dataTransfer.getData("cardId");
    if (!cardId) return;
    const { element } = getNearestIndicator(e, getIndicators());
    const before = element.getAttribute("data-before") || "-1";
    if (before !== cardId) {
      let copy = [...cards];

      let cardToTransfer = copy.find((card) => card.id === cardId);

      if (!cardToTransfer) return;

      cardToTransfer = { ...cardToTransfer, column };

      copy = copy.filter((card) => card.id !== cardId);

      const moveToBack = before === "-1";

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const index = copy.findIndex((card) => card.id === before);
        if (index === undefined) return;
        copy.splice(index, 0, cardToTransfer);
      }
      setCards(copy);
    }
  };

  const highlightIndicator = (e: React.DragEvent<HTMLDivElement>) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.classList.add("opacity-100");
  };
  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column=${column}]`));
  };
  const getNearestIndicator = (
    e: React.DragEvent<HTMLDivElement>,
    indicators: Element[]
  ) => {
    const DISTANCE_OFFSET = 50;
    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - box.top - DISTANCE_OFFSET;

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        }
        return closest; // Always return closest, even if the condition is not met
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };
  const clearHighlights = (els?: Element[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((el) => {
      el.classList.remove("opacity-100");
    });
  };

  return (
    <div className="w-64 shrink-0">
      <div className="flex justify-between items-center mb-3 p-2.5 border rounded">
        <div className="flex items-center gap-2">
          <Circle className={`${headingColor} w-4 h-4`} />
          <h3 className={`${headingColor}`}>{title}</h3>
        </div>
        <span className="rounded text-secondary-foreground text-sm">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`h-full w-full p-2 transition-colors border overflow-y-auto scroller ${
          activeCard ? "bg-primary/5" : "bg-background"
        }`}
      >
        {filteredCards.map((card) => (
          <Card key={card.id} {...card} handleDragStart={handleDragStart} />
        ))}
        <DropIndicator before="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
};

const Card = ({
  title,
  id,
  column,
  handleDragStart,
  createdAt,
  tags,
}: CardProps) => {
  const colors = [
    "bg-red-400",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
  ];
  return (
    <>
      <DropIndicator before={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable={true}
        onDragStart={(e) => handleDragStart(e, { title, id, column })}
        className="space-y-2 bg-secondary/70 shadow-sm hover:shadow p-3 rounded transition-shadow cursor-grab active:cursor-grabbing"
      >
        <p className="font-bold text-muted-foreground text-sm">{title}</p>
        <div className="flex justify-start items-center w-full text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span className="ml-1 text-xs">{createdAt}</span>
        </div>
        <div className="flex flex-wrap gap-1">
          {tags?.map((tag, index) => (
            <span
              key={index}
              className={`${
                colors[index % colors.length]
              } text-white text-xs py-1 px-2  rounded`}
            >
              {tag}
            </span>
          ))}
        </div>
      </motion.div>
    </>
  );
};

const DropIndicator = ({ before, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={before || "-1"}
      data-column={column}
      className={cn(
        "bg-primary opacity-0 my-0.5 w-full h-0.5 rounded-full transition-colors"
      )}
    ></div>
  );
};

const DropZone = ({ setCards }: { setCards: Function }) => {
  const [active, setActive] = useState(false);
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(false);
  };
  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    console.log("drag end");
    const cardId = e.dataTransfer.getData("cardId");
    if (!cardId) return;

    setCards((prev: CardProps[]) => prev.filter((card) => card.id !== cardId));
    setActive(false);
  };

  return (
    <div
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      className={cn(
        "mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl border-muted-foreground bg-muted-foreground/50 text-muted-foreground transition-colors cursor-pointer",
        active && "border-red-800 bg-red-800/20 text-red-500"
      )}
    >
      {active ? (
        <Flame className="w-10 h-10" />
      ) : (
        <Trash className="w-10 h-10" />
      )}
    </div>
  );
};

const AddCard = ({
  column,
  setCards,
}: {
  column: string;
  setCards: Function;
}) => {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handlePostSubmit = (data: any) => {
    console.log("data->", data);
    const newCard = {
      column,
      title: data.createTask.name,
      description: data.createTask.description,
      id: data.createTask._id,
      tags: data.tags,
      createdAt: Math.floor(Math.random()),
    };
    console.log("newCard->", newCard);
    setCards((prev: any) => [...prev, newCard]);
    setText("");
    setAdding(false); // for this i have to handle the postsubmit here
  };

  return (
    <>
      {adding ? (
        <Dialog open={true} onOpenChange={(val) => setAdding(val)}>
          <div className="fixed inset-0 bg-black opacity-30 z-2"></div>
          <DialogContent className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform p-4 w-full max-w-5xl rounded-lg  bg-background shadow-lg ">
            <DialogTitle className="text-center">Add Task</DialogTitle>
            <DialogClose asChild>
              <Button
                variant={"ghost"}
                className="absolute right-4 top-2 text-muted-foreground text-xs"
                onClick={() => setAdding(false)}
              >
                <CrossIcon className="w-4 h-4 rotate-45 hover:text-red-500" />
              </Button>
            </DialogClose>

            <CreateTaskForm handlePostSubmit={handlePostSubmit} />
          </DialogContent>
        </Dialog>
      ) : (
        <Button
          variant={"ghost"}
          className="flex justify-start items-center gap-1.5 hover:bg-primary/30 px-3 py-1.5 w-full text-muted-foreground text-xs hover:text-primary-foreground transition-colors"
          onClick={() => setAdding(true)}
        >
          <span>Add Card</span>
          <Plus className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};

export default TaskBoard;
