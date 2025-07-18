"use client"

import { useState } from "react"
import "./GroupForm.css"

const GroupForm = ({ onGroupCreate, onMembersAdd }) => {
  const [groupName, setGroupName] = useState("")
  const [memberName, setMemberName] = useState("")
  const [members, setMembers] = useState([])

  const addMember = () => {
    if (memberName.trim() && !members.includes(memberName.trim())) {
      const newMembers = [...members, memberName.trim()]
      setMembers(newMembers)
      setMemberName("")
    }
  }

  const removeMember = (memberToRemove) => {
    setMembers(members.filter((member) => member !== memberToRemove))
  }

  const handleMemberKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addMember()
    }
  }

  const createGroup = () => {
    if (groupName.trim() && members.length >= 2) {
      onGroupCreate(groupName.trim())
      onMembersAdd(members)
    }
  }

  return (
    <div className="group-form card">
      <h2 className="form-title">Create Your Group</h2>

      <div className="form-group">
        <label className="form-label">Group Name</label>
        <input
          type="text"
          className="form-input"
          placeholder="e.g., Goa Trip, Pizza Night, Movie Plan"
          value={groupName}
          onChange={(e) => setGroupName(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label className="form-label">Add Members</label>
        <div className="member-input-container">
          <input
            type="text"
            className="form-input member-input"
            placeholder="Enter member name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            onKeyPress={handleMemberKeyPress}
          />
          <button className="btn btn-secondary add-member-btn" onClick={addMember} disabled={!memberName.trim()}>
            Add
          </button>
        </div>
      </div>

      {members.length > 0 && (
        <div className="members-list">
          <h3>Members ({members.length})</h3>
          <div className="members-grid">
            {members.map((member, index) => (
              <div key={index} className="member-tag">
                <span>{member}</span>
                <button className="remove-member-btn" onClick={() => removeMember(member)} title="Remove member">
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="form-actions">
        <button
          className="btn btn-primary create-group-btn"
          onClick={createGroup}
          disabled={!groupName.trim() || members.length < 2}
        >
          Create Group & Start Splitting
        </button>
        {members.length < 2 && <p className="help-text">Add at least 2 members to create a group</p>}
      </div>
    </div>
  )
}

export default GroupForm
