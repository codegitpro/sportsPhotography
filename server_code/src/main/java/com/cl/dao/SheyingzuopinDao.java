package com.cl.dao;

import com.cl.entity.SheyingzuopinEntity;
import com.baomidou.mybatisplus.mapper.BaseMapper;
import java.util.List;
import java.util.Map;
import com.baomidou.mybatisplus.mapper.Wrapper;
import com.baomidou.mybatisplus.plugins.pagination.Pagination;

import org.apache.ibatis.annotations.Param;
import com.cl.entity.view.SheyingzuopinView;


/**
 * 摄影作品
 * 
 * @author 
 * @email 
 * @date 2026-03-12 19:47:39
 */
public interface SheyingzuopinDao extends BaseMapper<SheyingzuopinEntity> {
	
	List<SheyingzuopinView> selectListView(@Param("ew") Wrapper<SheyingzuopinEntity> wrapper);

	List<SheyingzuopinView> selectListView(Pagination page,@Param("ew") Wrapper<SheyingzuopinEntity> wrapper);
	
	SheyingzuopinView selectView(@Param("ew") Wrapper<SheyingzuopinEntity> wrapper);


    List<Map<String, Object>> selectValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<SheyingzuopinEntity> wrapper);

    List<Map<String, Object>> selectTimeStatValue(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<SheyingzuopinEntity> wrapper);

    List<Map<String, Object>> selectGroup(@Param("params") Map<String, Object> params,@Param("ew") Wrapper<SheyingzuopinEntity> wrapper);



}
