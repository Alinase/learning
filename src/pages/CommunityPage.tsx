import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ForumTopic } from '../types';
import { MessageSquare, ThumbsUp, Send, User, CheckCircle2, PlusCircle, ArrowRight } from 'lucide-react';

export const CommunityPage: React.FC = () => {
  const { forumTopics, setForumTopics, currentUser, showNotification } = useApp();

  const [selectedTopic, setSelectedTopic] = useState<ForumTopic | null>(forumTopics[0] || null);
  const [newQuestionTitle, setNewQuestionTitle] = useState('');
  const [newQuestionCategory, setNewQuestionCategory] = useState('Cloud Computing');
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [showAskModal, setShowAskModal] = useState(false);
  const [replyContent, setReplyContent] = useState('');

  const handleUpvote = (topicId: string) => {
    setForumTopics((prev) =>
      prev.map((t) => (t.id === topicId ? { ...t, upvotes: t.upvotes + 1 } : t))
    );
    if (selectedTopic && selectedTopic.id === topicId) {
      setSelectedTopic((prev) => (prev ? { ...prev, upvotes: prev.upvotes + 1 } : null));
    }
    showNotification('Upvoted discussion!');
  };

  const handlePostQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestionTitle.trim() || !newQuestionContent.trim()) return;

    const newTopic: ForumTopic = {
      id: `topic-${Date.now()}`,
      title: newQuestionTitle,
      category: newQuestionCategory,
      authorName: currentUser.name,
      authorRole: currentUser.role === 'student' ? 'Student' : 'Instructor',
      authorAvatar: currentUser.avatar,
      content: newQuestionContent,
      createdAt: 'Just now',
      upvotes: 1,
      replies: []
    };

    setForumTopics((prev) => [newTopic, ...prev]);
    setSelectedTopic(newTopic);
    setShowAskModal(false);
    setNewQuestionTitle('');
    setNewQuestionContent('');
    showNotification('Discussion question posted to the community!');
  };

  const handlePostReply = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTopic || !replyContent.trim()) return;

    const newReply = {
      id: `rep-${Date.now()}`,
      authorName: currentUser.name,
      authorRole: currentUser.role === 'student' ? 'Student' : 'Instructor & Founder',
      authorAvatar: currentUser.avatar,
      content: replyContent,
      createdAt: 'Just now',
      isInstructorAnswer: currentUser.role !== 'student'
    };

    const updated = {
      ...selectedTopic,
      replies: [...selectedTopic.replies, newReply]
    };

    setForumTopics((prev) => prev.map((t) => (t.id === selectedTopic.id ? updated : t)));
    setSelectedTopic(updated);
    setReplyContent('');
    showNotification('Reply posted successfully!');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold text-teal-700 tracking-wider uppercase">
            <span>Student Community</span>
            <span aria-hidden="true">·</span>
            <span>Technical Forum</span>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">AliTech Tech Community & Forum</h1>
          <p className="text-xs text-slate-500 mt-1">
            Collaborate with peers, ask architecture questions, and get answers from certified instructors.
          </p>
        </div>

        <button
          onClick={() => setShowAskModal(true)}
          className="px-4 py-2.5 bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 self-start sm:self-auto shadow-xs transition-colors"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Ask a Question</span>
        </button>
      </div>

      {/* Main Forum Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Topics List (5 cols) */}
        <div className="lg:col-span-5 space-y-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
            Recent Discussions ({forumTopics.length})
          </span>

          <div className="space-y-3">
            {forumTopics.map((topic) => {
              const isSelected = selectedTopic?.id === topic.id;
              return (
                <div
                  key={topic.id}
                  onClick={() => setSelectedTopic(topic)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-teal-50/70 border-teal-500 shadow-xs'
                      : 'bg-white border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 text-xs">
                    <span className="text-[11px] font-bold text-teal-700 uppercase">{topic.category}</span>
                    <span className="text-[11px] text-slate-400">{topic.createdAt}</span>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 mt-1.5 leading-snug line-clamp-2">
                    {topic.title}
                  </h3>

                  <p className="text-xs text-slate-600 mt-1 line-clamp-2 leading-relaxed">{topic.content}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 pt-3 mt-3 border-t border-slate-100">
                    <div className="flex items-center gap-2">
                      <img
                        src={topic.authorAvatar}
                        alt={topic.authorName}
                        className="w-5 h-5 rounded-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                      <span>{topic.authorName}</span>
                    </div>

                    <div className="flex items-center gap-3">
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <ThumbsUp className="w-3 h-3 text-slate-400" />
                        <span>{topic.upvotes}</span>
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[11px]">
                        <MessageSquare className="w-3 h-3 text-slate-400" />
                        <span>{topic.replies.length}</span>
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Selected Topic Thread (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-xs p-6 space-y-6">
          {selectedTopic ? (
            <>
              {/* Main Question */}
              <div className="space-y-4 pb-6 border-b border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-teal-700 uppercase tracking-wider">
                    {selectedTopic.category}
                  </span>
                  <button
                    onClick={() => handleUpvote(selectedTopic.id)}
                    className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors"
                  >
                    <ThumbsUp className="w-3.5 h-3.5 text-teal-600" />
                    <span>Upvote ({selectedTopic.upvotes})</span>
                  </button>
                </div>

                <h2 className="text-xl font-bold text-slate-900 leading-snug">{selectedTopic.title}</h2>

                <div className="flex items-center gap-3 text-xs text-slate-500">
                  <img
                    src={selectedTopic.authorAvatar}
                    alt={selectedTopic.authorName}
                    className="w-8 h-8 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <span className="font-semibold text-slate-900 block">{selectedTopic.authorName}</span>
                    <span>
                      {selectedTopic.authorRole} · Posted {selectedTopic.createdAt}
                    </span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 leading-relaxed whitespace-pre-wrap">{selectedTopic.content}</p>
              </div>

              {/* Answers & Replies */}
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900">
                  Replies & Solutions ({selectedTopic.replies.length})
                </h3>

                {selectedTopic.replies.length === 0 ? (
                  <p className="text-xs text-slate-400 italic">No replies yet. Be the first to answer!</p>
                ) : (
                  selectedTopic.replies.map((reply) => (
                    <div
                      key={reply.id}
                      className={`p-4 rounded-xl border space-y-2 text-xs ${
                        reply.isInstructorAnswer
                          ? 'bg-teal-50/60 border-teal-200 text-slate-800'
                          : 'bg-slate-50 border-slate-200 text-slate-700'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <img
                            src={reply.authorAvatar}
                            alt={reply.authorName}
                            className="w-6 h-6 rounded-full object-cover"
                            referrerPolicy="no-referrer"
                          />
                          <span className="font-semibold text-slate-900">{reply.authorName}</span>
                          {reply.isInstructorAnswer && (
                            <span className="text-[10px] font-bold text-teal-800 bg-teal-100 px-1.5 py-0.5 rounded">
                              Official Faculty
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-400">{reply.createdAt}</span>
                      </div>
                      <p className="leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                    </div>
                  ))
                )}
              </div>

              {/* Reply Box */}
              <form onSubmit={handlePostReply} className="space-y-3 pt-4 border-t border-slate-100">
                <label className="text-xs font-semibold text-slate-700 block">Post a Technical Reply</label>
                <textarea
                  rows={3}
                  required
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  placeholder="Share your technical advice or solution..."
                  className="w-full p-3 rounded-xl border border-slate-300 text-xs focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 transition-colors shadow-xs"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Reply</span>
                  </button>
                </div>
              </form>
            </>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">
              Select a question on the left to read and reply.
            </div>
          )}
        </div>
      </div>

      {/* Ask Question Modal */}
      {showAskModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
            <h3 className="text-base font-bold text-slate-900">Ask a Question in the Tech Community</h3>

            <form onSubmit={handlePostQuestion} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold text-slate-700 block mb-1">Topic Category</label>
                <select
                  value={newQuestionCategory}
                  onChange={(e) => setNewQuestionCategory(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg bg-white"
                >
                  <option value="Cloud Computing">Cloud Computing (GCP, Azure, AWS)</option>
                  <option value="Cybersecurity">Cybersecurity & SOC</option>
                  <option value="Artificial Intelligence">Artificial Intelligence & ML</option>
                  <option value="Software Development">Software Development & APIs</option>
                  <option value="Networking">Networking & IT Infrastructure</option>
                </select>
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Question Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Best way to configure VPC peering between Lusaka and South Africa region?"
                  value={newQuestionTitle}
                  onChange={(e) => setNewQuestionTitle(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div>
                <label className="font-semibold text-slate-700 block mb-1">Detailed Explanation & Error Logs</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Provide context, code snippets, or configuration details..."
                  value={newQuestionContent}
                  onChange={(e) => setNewQuestionContent(e.target.value)}
                  className="w-full p-2 border border-slate-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-teal-500"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAskModal(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-lg font-bold shadow-xs"
                >
                  Post Discussion
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
