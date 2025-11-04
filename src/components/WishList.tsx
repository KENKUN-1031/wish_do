"use client";

import { useEffect, useState } from "react";

type Wish = {
  id: string;
  title: string;
  description: string | null;
  category: "STUDY" | "HOBBY" | "TRAVEL" | "HEALTH" | "CAREER" | "OTHER";
  priority: "HIGH" | "MEDIUM" | "LOW";
  completed: boolean;
  deadline: string | null;
  createdAt: string;
  updatedAt: string;
};

const categoryLabels = {
  STUDY: "📚 勉強",
  HOBBY: "🎨 趣味",
  TRAVEL: "✈️ 旅行",
  HEALTH: "💪 健康",
  CAREER: "💼 キャリア",
  OTHER: "📌 その他",
};

const priorityLabels = {
  HIGH: "高",
  MEDIUM: "中",
  LOW: "低",
};

const priorityColors = {
  HIGH: "bg-red-100 text-red-800",
  MEDIUM: "bg-yellow-100 text-yellow-800",
  LOW: "bg-green-100 text-green-800",
};

export default function WishList() {
  const [wishes, setWishes] = useState<Wish[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingWish, setEditingWish] = useState<Wish | null>(null);

  // Form state
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<Wish["category"]>("OTHER");
  const [priority, setPriority] = useState<Wish["priority"]>("MEDIUM");
  const [deadline, setDeadline] = useState("");

  useEffect(() => {
    fetchWishes();
  }, []);

  const fetchWishes = async () => {
    try {
      const res = await fetch("/api/wishes");
      if (res.ok) {
        const data = await res.json();
        setWishes(data);
      }
    } catch (error) {
      console.error("Failed to fetch wishes:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const wishData = {
      title,
      description: description || null,
      category,
      priority,
      deadline: deadline || null,
    };

    try {
      if (editingWish) {
        // Update existing wish
        const res = await fetch(`/api/wishes/${editingWish.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(wishData),
        });

        if (res.ok) {
          await fetchWishes();
          resetForm();
        }
      } else {
        // Create new wish
        const res = await fetch("/api/wishes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(wishData),
        });

        if (res.ok) {
          await fetchWishes();
          resetForm();
        }
      }
    } catch (error) {
      console.error("Failed to save wish:", error);
    }
  };

  const toggleComplete = async (wish: Wish) => {
    try {
      const res = await fetch(`/api/wishes/${wish.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !wish.completed }),
      });

      if (res.ok) {
        await fetchWishes();
      }
    } catch (error) {
      console.error("Failed to toggle wish:", error);
    }
  };

  const deleteWish = async (id: string) => {
    if (!confirm("本当に削除しますか？")) return;

    try {
      const res = await fetch(`/api/wishes/${id}`, {
        method: "DELETE",
      });

      if (res.ok) {
        await fetchWishes();
      }
    } catch (error) {
      console.error("Failed to delete wish:", error);
    }
  };

  const startEdit = (wish: Wish) => {
    setEditingWish(wish);
    setTitle(wish.title);
    setDescription(wish.description || "");
    setCategory(wish.category);
    setPriority(wish.priority);
    setDeadline(wish.deadline ? wish.deadline.split("T")[0] : "");
    setShowForm(true);
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setCategory("OTHER");
    setPriority("MEDIUM");
    setDeadline("");
    setShowForm(false);
    setEditingWish(null);
  };

  if (loading) {
    return <div className="text-center py-8">読み込み中...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Add Button */}
      {!showForm && (
        <button
          onClick={() => setShowForm(true)}
          className="w-full py-4 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl font-semibold hover:from-purple-600 hover:to-blue-600 transition shadow-lg"
        >
          + 新しいやりたいことを追加
        </button>
      )}

      {/* Form */}
      {showForm && (
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-900">
            {editingWish ? "✏️ やりたいことを編集" : "✨ 新しいやりたいことを追加"}
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                タイトル *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="w-full px-3 py-2 bg-white text-gray-900 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-gray-500"
                placeholder="例: 富士山に登る"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                詳細
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-white text-gray-900 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 placeholder:text-gray-500"
                rows={3}
                placeholder="詳細な説明を書いてください..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  カテゴリー
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value as Wish["category"])}
                  className="w-full px-3 py-2 bg-white text-gray-900 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {Object.entries(categoryLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  優先度
                </label>
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value as Wish["priority"])}
                  className="w-full px-3 py-2 bg-white text-gray-900 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  {Object.entries(priorityLabels).map(([value, label]) => (
                    <option key={value} value={value}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  期限
                </label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full px-3 py-2 bg-white text-gray-900 border-2 border-gray-400 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
            </div>

            <div className="flex gap-2">
              <button
                type="submit"
                className="flex-1 py-2 bg-purple-500 text-white rounded-lg font-semibold hover:bg-purple-600 transition"
              >
                {editingWish ? "更新" : "追加"}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                キャンセル
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Wishes List */}
      <div className="space-y-4">
        {wishes.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            まだやりたいことがありません。<br />
            上のボタンから追加してみましょう！
          </div>
        ) : (
          wishes.map((wish) => (
            <div
              key={wish.id}
              className={`bg-white rounded-xl shadow p-6 transition hover:shadow-lg ${
                wish.completed ? "opacity-60" : ""
              }`}
            >
              <div className="flex items-start gap-4">
                <input
                  type="checkbox"
                  checked={wish.completed}
                  onChange={() => toggleComplete(wish)}
                  className="mt-1 w-5 h-5 rounded border-gray-300 text-purple-500 focus:ring-purple-500"
                />

                <div className="flex-1">
                  <h3
                    className={`text-lg font-semibold ${
                      wish.completed ? "line-through text-gray-400" : "text-gray-800"
                    }`}
                  >
                    {wish.title}
                  </h3>

                  {wish.description && (
                    <p className="text-gray-600 mt-1">{wish.description}</p>
                  )}

                  <div className="flex gap-2 mt-3 flex-wrap">
                    <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full">
                      {categoryLabels[wish.category]}
                    </span>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        priorityColors[wish.priority]
                      }`}
                    >
                      優先度: {priorityLabels[wish.priority]}
                    </span>
                    {wish.deadline && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded-full">
                        期限: {new Date(wish.deadline).toLocaleDateString("ja-JP")}
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => startEdit(wish)}
                    className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded transition"
                  >
                    編集
                  </button>
                  <button
                    onClick={() => deleteWish(wish.id)}
                    className="px-3 py-1 text-sm text-red-600 hover:bg-red-50 rounded transition"
                  >
                    削除
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
